import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import ProtectedRoute from '../../components/ProtectedRoute'

export default function UserDashboard() {
  const { user, token } = useAuth()
  const [stats, setStats] = useState({
    totalTransactions: 0,
    loading: true,
  })
  const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:4242'

  useEffect(() => {
    fetchStats()
  }, [token])

  const fetchStats = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/orders/my-orders`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      
      if (data.orders) {
        setStats({
          totalTransactions: data.orders.length,
          loading: false,
        })
      }
    } catch (err) {
      console.error('Error fetching stats:', err)
      setStats(prev => ({ ...prev, loading: false }))
    }
  }

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name || 'User'}!</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Profile</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl font-bold">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900">{user?.name || 'User'}</p>
                  <p className="text-gray-600">{user?.email || 'user@example.com'}</p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                {/* Total Transactions Card */}
                <button
                  onClick={() => window.location.href = '/dashboard/transactions'}
                  className="w-full bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-4 hover:border-blue-400 hover:shadow-lg transition-all duration-200 text-left"
                >
                  <div className="text-3xl mb-1">💰</div>
                  <div className="text-3xl font-bold text-blue-700">
                    {stats.loading ? '...' : stats.totalTransactions}
                  </div>
                  <div className="text-sm font-medium text-blue-600">Transactions</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">💰 View Transactions</h3>
          <p className="text-gray-600 mb-4">Check your purchase history</p>
          <button
            onClick={() => window.location.href = '/dashboard/transactions'}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            View Transaction History
          </button>
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Settings</h2>
          <p className="text-gray-600 mb-4">
            Want to update your profile, change password, or manage your account settings?
          </p>
          <button
            onClick={() => window.location.href = '/account/settings'}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Go to Settings
          </button>
        </div>
      </div>
    </ProtectedRoute>
  )
}