import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import ProtectedRoute from '../../components/ProtectedRoute'

export default function PurchasedProducts() {
  const { user, token } = useAuth()
  const [purchases, setPurchases] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [initialLoadComplete, setInitialLoadComplete] = useState(false)
  const [showEmptyState, setShowEmptyState] = useState(false)
  const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:4242'

  useEffect(() => {
    fetchPurchases()
  }, [token])

  // Show empty state after 10-15 seconds if no purchases found
  useEffect(() => {
    if (initialLoadComplete && purchases.length === 0 && !loading) {
      const timer = setTimeout(() => {
        setShowEmptyState(true)
      }, 15000) // 15 seconds

      return () => clearTimeout(timer)
    } else {
      setShowEmptyState(false)
    }
  }, [initialLoadComplete, purchases.length, loading])

  const fetchPurchases = async () => {
    try {
      setLoading(true)
      setInitialLoadComplete(false)
      setShowEmptyState(false)
      console.log('[Purchases] Fetching orders from:', `${backendUrl}/api/orders/my-orders`)
      console.log('[Purchases] Token exists:', !!token)
      console.log('[Purchases] User:', user)
      
      const res = await fetch(`${backendUrl}/api/orders/my-orders`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      console.log('[Purchases] Response status:', res.status)
      
      const data = await res.json()
      console.log('[Purchases] Response data:', data)
      
      if (data.orders) {
        console.log(`[Purchases] Found ${data.orders.length} orders`)
        // Sort by createdAt in descending order (newest first)
        const sortedOrders = [...data.orders].sort((a, b) => {
          const dateA = new Date(a.createdAt)
          const dateB = new Date(b.createdAt)
          return dateB - dateA
        })
        setPurchases(sortedOrders)
      } else if (data.error) {
        setError(data.error)
      }
      setError('')
    } catch (err) {
      console.error('Error fetching purchases:', err)
      setError(err.message || 'Failed to fetch purchases')
    } finally {
      setLoading(false)
      setInitialLoadComplete(true)
    }
  }

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Purchased Products</h1>
          <p className="text-gray-600">View all your purchased products</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600">
            {error}
          </div>
        )}

        {!initialLoadComplete ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-500"></div>
          </div>
        ) : purchases.length === 0 && !showEmptyState ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-500"></div>
          </div>
        ) : purchases.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Purchases Yet</h3>
            <p className="text-gray-600 mb-6">You haven't purchased any products yet.</p>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {purchases.map((purchase) => (
              <div key={purchase.id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    {purchase.thumbnailUrl && (
                      <img
                        src={purchase.thumbnailUrl}
                        alt={purchase.productName}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{purchase.productName}</h3>
                      <p className="text-sm text-gray-600">
                        {purchase.productType ? `Type: ${purchase.productType}` : ''}
                      </p>
                      <p className="text-sm text-gray-500">
                        Purchased on {new Date(purchase.createdAt).toLocaleDateString()}
                      </p>
                      {purchase.offerNumber && (
                        <div className="mt-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
                          <p className="text-xs text-blue-600 font-medium mb-1">Package Activation Number:</p>
                          <p className="text-sm text-blue-900 font-mono font-semibold">{purchase.offerNumber}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">
                        ৳{parseFloat(purchase.amount).toFixed(0)}
                      </p>
                      <p className="text-sm text-gray-600">Order ID: {purchase.id.slice(0, 8)}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      purchase.status === 'completed' || purchase.status === 'succeeded'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {purchase.status === 'completed' || purchase.status === 'succeeded' ? '✅ Completed' : '⏳ Pending'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
}