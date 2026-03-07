// ===============================
// Load environment variables FIRST before any imports
// ===============================
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load .env.local for development, .env for production
const envPath = process.env.NODE_ENV === 'production'
  ? path.join(__dirname, '.env')
  : path.join(__dirname, '.env.local')
dotenv.config({ path: envPath })

console.log(`[Server] Loading environment from: ${envPath}`)
console.log('[Server] Airtable Configuration:')
console.log(`  - BASE_ID: ${process.env.AIRTABLE_BASE_ID}`)
console.log(`  - USERS_TABLE_ID: ${process.env.AIRTABLE_USERS_TABLE_ID}`)
console.log(`  - ORDERS_TABLE_ID: ${process.env.AIRTABLE_ORDERS_TABLE_ID}`)
console.log(`  - PRODUCTS_TABLE_ID: ${process.env.AIRTABLE_PRODUCTS_TABLE_ID}`)

// NOW import everything else (after env vars are loaded)
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dns from 'dns'
import authController from './controllers/authController.js'
import ordersController from './controllers/ordersController.js'
import productsController from './controllers/productsController.js'
import chatController from './controllers/chatController.js'
import { createOrder } from './services/airtableOrderService.js'
import * as userService from './services/airtableUserService.js'
import { authenticateToken, generateCSRFToken } from './middleware/auth.js'
import { sendPaymentConfirmationEmail } from './services/emailService.js'
import { requireAdmin } from './middleware/admin.js'
import { apiLimiter, authLimiter, passwordResetLimiter, passwordChangeLimiter, tokenRefreshLimiter } from './middleware/rateLimiter.js'

dns.setDefaultResultOrder('ipv4first')

const app = express()

// Trust proxy - needed for nginx reverse proxy
app.set('trust proxy', 1)

app.use(cors({ 
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true, // Allow cookies
}))

// Parse cookies
app.use(cookieParser())

// Parse JSON body
app.use(express.json())

// ===============================
// CREATE MANUAL PAYMENT ORDER
// ===============================
app.post('/api/create-manual-payment', authenticateToken, async (req, res) => {
  try {
    console.log('🔥 Manual payment request:', req.body)

    const { productId, productName, originalPrice, paymentMethod, transactionId, offerNumber } = req.body
    const userId = req.user.id // Get logged-in user's ID

    // Validate required fields
    if (!productName || !originalPrice) {
      return res.status(400).json({ error: 'Product name and original price are required' })
    }

    // Validate payment method
    const validPaymentMethods = ['bkash', 'nagad', 'rocket', 'bank']
    if (!validPaymentMethods.includes(paymentMethod)) {
      return res.status(400).json({ error: 'Invalid payment method' })
    }

    // Validate offer number (package activation number)
    if (!offerNumber || offerNumber.trim().length < 11) {
      return res.status(400).json({ error: 'Please enter a valid phone number for package activation' })
    }

    // Validate transaction ID
    if (!transactionId || transactionId.trim().length < 3) {
      return res.status(400).json({ error: 'Transaction ID is required' })
    }

    // Get user details
    let userAccountEmail = ''
    let userAccountName = ''

    try {
      const user = await userService.getUserById(userId)
      if (user) {
        userAccountEmail = user.fields.Email
        userAccountName = user.fields.Name || ''
      }
    } catch (err) {
      console.log('⚠️ Error getting user:', err.message)
    }

    // Create order in Airtable with manual payment details
    const order = await createOrder({
      userId,
      productId,
      productName,
      amount: originalPrice,
      paymentId: transactionId, // Transaction ID for manual verification
      offerNumber: offerNumber.trim(), // Package activation phone number
      status: 'pending', // Status is pending until manual verification
      customerEmail: userAccountEmail,
      customerName: userAccountName,
      paymentMethod: paymentMethod, // Store payment method (bkash, nagad, rocket, bank)
    })

    console.log('✅ Order created in Airtable:', order.id)
    
    // Send payment pending email
    if (userAccountEmail) {
      try {
        await sendPaymentConfirmationEmail(userAccountEmail, {
          orderId: order.id,
          productName,
          amount: originalPrice,
          customerName: userAccountName,
          date: order.createdTime,
          offerNumber: offerNumber.trim(),
          transactionId: transactionId.trim(),
        })
        console.log(`✅ Payment pending email sent to ${userAccountEmail}`)
      } catch (emailError) {
        console.error(`❌ Failed to send email:`, emailError)
      }
    }

    res.json({ 
      success: true,
      orderId: order.id,
      message: 'Order created successfully. Please wait for manual verification of your payment.'
    })
  } catch (err) {
    console.error('Manual payment failed:', err);
    if (err.name === 'AbortError') {
      return res.status(504).json({ error: 'Airtable timeout' });
    }
    res.status(500).json({ error: 'Failed to create order' });
  }
})

// ===============================
// CSRF TOKEN ENDPOINT
// ===============================
app.get('/api/csrf-token', (req, res) => {
  const csrfToken = generateCSRFToken()
  res.cookie('csrf_token', csrfToken, {
    httpOnly: false, // Allow frontend to read
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    sameSite: 'strict',
    maxAge: 3600000, // 1 hour
  })
  res.json({ csrfToken })
})

// ===============================
// AUTH ROUTES
// ===============================

// Register (with rate limiting)
app.post(
  '/api/auth/register',
  authLimiter,
  authController.registerValidation,
  authController.register
)

// Login (with rate limiting)
app.post(
  '/api/auth/login',
  authLimiter,
  authController.loginValidation,
  authController.login
)

// Refresh token (with rate limiting)
app.post('/api/auth/refresh', tokenRefreshLimiter, authController.refreshToken)

// Logout (clears refresh token) - requires authentication
app.post('/api/auth/logout', authenticateToken, authController.logout)

// ===============================
// ADMIN PRODUCT ROUTES
// ===============================

// Get all products (admin only)
app.get('/api/admin/products', authenticateToken, requireAdmin, productsController.getAllProducts)

// Create product (admin only)
app.post(
  '/api/admin/products',
  authenticateToken,
  requireAdmin,
  productsController.productValidation,
  productsController.createProduct
)

// Update product (admin only)
app.patch(
  '/api/admin/products/:id',
  authenticateToken,
  requireAdmin,
  productsController.productValidation,
  productsController.updateProduct
)

// Delete product (admin only)
app.delete('/api/admin/products/:id', authenticateToken, requireAdmin, productsController.deleteProduct)

// ===============================
// ADMIN USER MANAGEMENT ROUTES
// ===============================

// Get all users (admin only)
app.get('/api/admin/users', authenticateToken, requireAdmin, authController.getAllUsers)

// Update user status/role (admin only)
app.patch('/api/admin/users/:id', authenticateToken, requireAdmin, authController.updateUserStatus)

// Delete user (admin only)
app.delete('/api/admin/users/:id', authenticateToken, requireAdmin, authController.adminDeleteUser)

// Email verification
app.post('/api/auth/verify-email', authController.verifyEmail)
// Resend verification (authenticated - for logged-in users)
app.post('/api/auth/resend-verification', authenticateToken, authController.resendVerification)
// Resend verification by email (public - for unverified users who can't login)
app.post(
  '/api/auth/resend-verification-email',
  passwordResetLimiter,
  authController.resendVerificationByEmailValidation,
  authController.resendVerificationByEmail
)

// Change email
app.post('/api/auth/change-email', authenticateToken, authController.changeEmail)

// Delete account
app.post('/api/auth/delete-account', authenticateToken, authController.deleteAccount)

// Get current user profile
app.get('/api/auth/me', authenticateToken, authController.getProfile)

// Update profile
app.put('/api/auth/profile', authenticateToken, authController.updateProfile)

// Change password (with rate limiting)
app.post('/api/auth/change-password', authenticateToken, passwordChangeLimiter, authController.changePassword)

// ===============================
// AI CHAT ROUTE
// ===============================
// AI Chat (with rate limiting)
app.post('/api/chat', apiLimiter, chatController.handleChat)

// Forgot password (with strict rate limiting)
app.post(
  '/api/auth/forgot-password',
  passwordResetLimiter,
  authController.forgotPasswordValidation,
  authController.forgotPassword
)

// Reset password (with strict rate limiting)
app.post(
  '/api/auth/reset-password',
  passwordResetLimiter,
  authController.resetPasswordValidation,
  authController.resetPassword
)

// ===============================
// ORDERS ROUTES
// ===============================

// Get all orders (admin only)
app.get('/api/orders', authenticateToken, ordersController.getAllOrders)

// Get current user's orders
app.get('/api/orders/my-orders', authenticateToken, ordersController.getUserOrders)

// Get order statistics (admin only)
app.get('/api/orders/stats', authenticateToken, ordersController.getOrderStats)

// Update order status (admin only)
app.patch('/api/orders/:orderId/status', authenticateToken, ordersController.updateOrderStatus)

// ===============================
// HEALTH CHECK
// ===============================
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    cors: process.env.FRONTEND_URL || 'http://localhost:5173'
  })
})

// ===============================
// START SERVER
// ===============================
app.listen(4242, () => {
  console.log('✅ Backend running on http://localhost:4242')
  console.log('💳 Manual payment endpoint: /api/create-manual-payment')
  console.log('🔐 Auth endpoints: /api/auth/*')
  console.log('🛡️ Security features: Rate limiting, CSRF protection, Refresh tokens enabled')
  console.log('🌍 CORS origin:', process.env.FRONTEND_URL || 'http://localhost:5173')
  console.log('🏥 Health check: http://localhost:4242/health')
})
