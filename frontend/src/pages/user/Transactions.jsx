import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import ProtectedRoute from '../../components/ProtectedRoute'

export default function UserTransactions() {
  const { user, token } = useAuth()
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [initialLoadComplete, setInitialLoadComplete] = useState(false)
  const [showEmptyState, setShowEmptyState] = useState(false)
  const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:4242'

  useEffect(() => {
    fetchTransactions()
  }, [token])

  // Show empty state after 10-15 seconds if no transactions found
  useEffect(() => {
    if (initialLoadComplete && transactions.length === 0 && !loading) {
      const timer = setTimeout(() => {
        setShowEmptyState(true)
      }, 15000) // 15 seconds

      return () => clearTimeout(timer)
    } else {
      setShowEmptyState(false)
    }
  }, [initialLoadComplete, transactions.length, loading])

  const fetchTransactions = async () => {
    try {
      setLoading(true)
      setInitialLoadComplete(false)
      setShowEmptyState(false)
      console.log('[Transactions] Fetching orders from:', `${backendUrl}/api/orders/my-orders`)
      console.log('[Transactions] Token exists:', !!token)
      console.log('[Transactions] User:', user)
      
      const res = await fetch(`${backendUrl}/api/orders/my-orders`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      console.log('[Transactions] Response status:', res.status)
      
      const data = await res.json()
      console.log('[Transactions] Response data:', data)
      
      if (data.orders) {
        console.log(`[Transactions] Found ${data.orders.length} orders`)
        // Sort by createdAt in descending order (newest first)
        const sortedOrders = [...data.orders].sort((a, b) => {
          const dateA = new Date(a.createdAt)
          const dateB = new Date(b.createdAt)
          return dateB - dateA
        })
        setTransactions(sortedOrders)
      } else if (data.error) {
        setError(data.error)
      }
      setError('')
    } catch (err) {
      console.error('Error fetching transactions:', err)
      setError(err.message || 'Failed to fetch transactions')
    } finally {
      setLoading(false)
      setInitialLoadComplete(true)
    }
  }

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transaction History</h1>
          <p className="text-gray-600">View your purchase history</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600">
            {error}
          </div>
        )}

        {!initialLoadComplete ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        ) : transactions.length === 0 && !showEmptyState ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        ) : transactions.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">💰</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Transactions Yet</h3>
            <p className="text-gray-600 mb-6">You haven't made any purchases yet.</p>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Package Activation #</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-mono text-sm text-gray-900">
                          {transaction.id.slice(0, 8)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          {transaction.thumbnailUrl && (
                            <img
                              src={transaction.thumbnailUrl}
                              alt={transaction.productName}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                          )}
                          <div>
                            <div className="font-medium text-gray-900">{transaction.productName}</div>
                            <div className="text-xs text-gray-500">{transaction.productType || ''}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {transaction.offerNumber ? (
                          <div className="font-mono text-sm text-blue-900 font-semibold bg-blue-50 border border-blue-200 rounded-lg px-2 py-1">
                            {transaction.offerNumber}
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(transaction.createdAt).toLocaleDateString()} at {new Date(transaction.createdAt).toLocaleTimeString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-lg font-semibold text-green-600">
                          ৳{parseFloat(transaction.amount).toFixed(0)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          transaction.status === 'completed' || transaction.status === 'succeeded'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {transaction.status === 'completed' || transaction.status === 'succeeded' ? '✅ Completed' : '⏳ Pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
}