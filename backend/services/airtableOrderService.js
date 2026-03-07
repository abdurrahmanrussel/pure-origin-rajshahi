import fetch from 'node-fetch'
import dns from 'dns'
import https from 'https'

dns.setDefaultResultOrder('ipv4first')

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
  keepAlive: true,
  timeout: 20000,
  family: 4,
})

// Helper function to make Airtable API calls
const airtableFetch = async (endpoint, options = {}) => {
  const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
  const AIRTABLE_PAT = process.env.AIRTABLE_PAT
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 15000)

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${endpoint}`,
      {
        ...options,
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_PAT}`,
          'Content-Type': 'application/json',
          ...options.headers,
        },
        agent: httpsAgent,
        signal: controller.signal,
      }
    )
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    if (error.name === 'AbortError') {
      throw new Error('Airtable request timeout')
    }
    throw error
  }
}

// Get all orders
export const getAllOrders = async () => {
  const ORDERS_TABLE_ID = process.env.AIRTABLE_ORDERS_TABLE_ID
  try {
    const url = encodeURIComponent(ORDERS_TABLE_ID)
    const response = await airtableFetch(url)
    
    if (!response.ok) {
      const error = await response.json()
      console.error('Airtable API error:', JSON.stringify(error, null, 2))
      throw new Error(error.error?.message || 'Failed to fetch orders')
    }

    const data = await response.json()
    return data.records || []
  } catch (error) {
    console.error('Error fetching orders:', error)
    throw error
  }
}

// Normalize email (remove dots for Gmail, convert to lowercase)
const normalizeEmail = (email) => {
  if (!email) return email
  const normalized = email.toLowerCase().trim()
  // For Gmail, remove ALL dots in the local part (before @)
  return normalized.replace(/^([^@]+)\.?.*@gmail\.com$/i, (match, localPart) => {
    return localPart.replace(/\./g, '') + '@gmail.com'
  })
}

// Get orders by user ID (Airtable Record ID) - PRIMARY METHOD
export const getOrdersByUserId = async (userId) => {
  const ORDERS_TABLE_ID = process.env.AIRTABLE_ORDERS_TABLE_ID
  try {
    console.log('[getOrdersByUserId] Searching for orders with UserID:', userId)
    
    // Filter by UserID field (Airtable Record ID from Users table)
    const url = `${encodeURIComponent(ORDERS_TABLE_ID)}?filterByFormula={UserID}="${userId}"`
    
    console.log('[getOrdersByUserId] Airtable query URL:', url)
    
    const response = await airtableFetch(url)
    
    if (!response.ok) {
      const error = await response.json()
      console.error('[getOrdersByUserId] Airtable error:', error)
      throw new Error(error.error?.message || 'Failed to fetch orders')
    }

    const data = await response.json()
    console.log(`[getOrdersByUserId] Found ${data.records?.length || 0} orders`)
    
    return data.records || []
  } catch (error) {
    console.error('[getOrdersByUserId] Error:', error)
    throw error
  }
}

// Get orders by user email - FALLBACK METHOD for guest orders or historical data
export const getOrdersByEmail = async (userEmail) => {
  const ORDERS_TABLE_ID = process.env.AIRTABLE_ORDERS_TABLE_ID
  try {
    console.log('[getOrdersByEmail] Searching for orders with email:', userEmail)
    
    // Filter by Customer Email field
    const normalizedEmail = normalizeEmail(userEmail)
    const url = `${encodeURIComponent(ORDERS_TABLE_ID)}?filterByFormula=LOWER({Customer Email})="${normalizedEmail.toLowerCase()}"`
    
    console.log('[getOrdersByEmail] Airtable query URL:', url)
    
    const response = await airtableFetch(url)
    
    if (!response.ok) {
      const error = await response.json()
      console.error('[getOrdersByEmail] Airtable error:', error)
      throw new Error(error.error?.message || 'Failed to fetch orders')
    }

    const data = await response.json()
    console.log(`[getOrdersByEmail] Found ${data.records?.length || 0} orders`)
    
    return data.records || []
  } catch (error) {
    console.error('[getOrdersByEmail] Error:', error)
    throw error
  }
}

// Create new order
export const createOrder = async (orderData) => {
  const ORDERS_TABLE_ID = process.env.AIRTABLE_ORDERS_TABLE_ID
  try {
    const { userId, productId, productName, amount, paymentId, paymentMethod, status = 'completed', customerEmail, customerName, offerNumber } = orderData

    // Build fields object
    const fields = {
      'Product ID': productId,
      Amount: amount,
      Status: status,
    }

    // Product Name field (keep separate)
    if (productName && productName.trim() !== '') {
      console.log('[createOrder] Product Name:', productName)
      fields['Product Name'] = productName
    }

    // Offer Number field - Stores customer's phone number for package activation (keep separate)
    if (offerNumber && offerNumber.trim() !== '') {
      console.log('[createOrder] Offer Number (Package Activation):', offerNumber)
      fields['Offer Number'] = offerNumber
    }

    // NEW: Combine Offer Number and Product Name into one field with line break
    if (offerNumber && offerNumber.trim() !== '' && productName && productName.trim() !== '') {
      const combinedOffer = `${offerNumber.trim()}\n${productName.trim()}`
      console.log('[createOrder] Combined Offer Number + Product Name:', combinedOffer)
      fields['Offer Number + Product Name'] = combinedOffer
    }

    // Auto-generate Order ID (for logging/reference only, not stored in Airtable)
    const autoOrderId = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
    console.log('[createOrder] Auto-generated Order ID:', autoOrderId)
    // Note: Airtable provides its own record ID, so we don't need to store Order ID field

    // Payment Method field
    if (paymentMethod && paymentMethod.trim() !== '') {
      console.log('[createOrder] Payment Method:', paymentMethod)
      fields['Payment Method'] = paymentMethod
    }

    // Payment ID field - Stores customer's transaction ID
    if (paymentId && paymentId.trim() !== '') {
      console.log('[createOrder] Transaction ID:', paymentId)
      fields['Transaction ID'] = paymentId
    }

    // Add UserID - CRITICAL for order tracking when email changes
    if (userId && userId.trim() !== '') {
      console.log('[createOrder] UserID:', userId)
      fields['UserID'] = userId
    } else {
      console.log('[createOrder] UserID is empty (guest purchase)')
      fields['UserID'] = '' // Still send field to Airtable
    }

    // Note: Airtable automatically adds 'createdTime' to every record
    // If you want a separate Purchase Date field, make sure it's configured correctly
    // For Date+Time field in Airtable, use: new Date().toISOString().replace('Z', '+00:00')
    // For now, we'll rely on Airtable's auto-created timestamp (createdTime)

    // Add customer email from user account (NORMALIZED to match Users table)
    // Always include field even if empty - allows Airtable to display it
    if (customerEmail && customerEmail.trim() !== '') {
      const normalizedEmail = normalizeEmail(customerEmail)
      console.log('[createOrder] Customer Email (user account):', customerEmail, '→', normalizedEmail)
      fields['Customer Email'] = normalizedEmail
    } else {
      console.log('[createOrder] Customer Email is empty (no user account or not provided)')
      fields['Customer Email'] = '' // Still send field to Airtable
    }

    // Add customer name from user account
    // Always include field even if empty - allows Airtable to display it
    if (customerName && customerName.trim() !== '') {
      console.log('[createOrder] Customer Name (user account):', customerName)
      fields['Customer Name'] = customerName
    } else {
      console.log('[createOrder] Customer Name is empty (no user account or not provided)')
      fields['Customer Name'] = '' // Still send field to Airtable
    }

    const requestBody = {
      records: [
        {
          fields,
        },
      ],
    }

    const response = await airtableFetch(encodeURIComponent(ORDERS_TABLE_ID), {
      method: 'POST',
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Airtable create order error:', JSON.stringify(error, null, 2))
      throw new Error(error.error?.message || 'Failed to create order')
    }

    const data = await response.json()
    return data.records[0]
  } catch (error) {
    console.error('Error creating order:', error)
    throw error
  }
}


// Update order status
export const updateOrderStatus = async (orderId, status) => {
  const ORDERS_TABLE_ID = process.env.AIRTABLE_ORDERS_TABLE_ID
  try {
    const response = await airtableFetch(`${encodeURIComponent(ORDERS_TABLE_ID)}/${orderId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        fields: {
          Status: status,
        },
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error?.message || 'Failed to update order')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error updating order:', error)
    throw error
  }
}

// Get order statistics
export const getOrderStats = async () => {
  try {
    const orders = await getAllOrders()
    
    // Only count 'completed' orders for revenue
    const completedOrders = orders.filter(o => o.fields.Status === 'completed')
    
    const stats = {
      totalOrders: orders.length,
      totalRevenue: completedOrders.reduce((sum, order) => {
        const amount = order.fields.Amount || 0
        return sum + amount
      }, 0),
      completedOrders: completedOrders.length,
      pendingOrders: orders.filter(o => o.fields.Status === 'pending').length,
      refundedOrders: orders.filter(o => o.fields.Status === 'refunded').length,
    }

    return stats
  } catch (error) {
    console.error('Error calculating order stats:', error)
    throw error
  }
}

export default {
  getAllOrders,
  getOrdersByUserId,
  getOrdersByEmail,
  createOrder,
  updateOrderStatus,
  getOrderStats,
}
