import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import ProtectedRoute from '../../components/ProtectedRoute'

export default function AdminDashboard() {
  const { token } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:4242'

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)

        // Fetch order stats
        const ordersRes = await fetch(`${backendUrl}/api/orders/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const ordersData = await ordersRes.json()

        // Fetch products
        const productsRes = await fetch(`${backendUrl}/api/admin/products`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const productsData = await productsRes.json()

        // Fetch users
        const usersRes = await fetch(`${backendUrl}/api/admin/users`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const usersData = await usersRes.json()

        const allProducts = productsData.products || []
        const indicators = allProducts.filter(p => p.type?.toLowerCase() === 'indicator').length || 0
        const strategies = allProducts.filter(p => p.type?.toLowerCase() === 'strategy').length || 0
        
        setStats({
          orders: ordersData.stats || {},
          totalProducts: indicators + strategies,
          indicators,
          strategies,
          totalUsers: usersData.users?.length || 0,
          activeUsers: usersData.users?.filter(u => u.isActive).length || 0,
        })
        setError('')
      } catch (err) {
        console.error('Error fetching stats:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [token])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
          <p className="text-gray-600">Monitor your platform's performance and activity</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Orders */}
          <div 
            onClick={() => navigate('/admin/transactions')}
            className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600 mb-2">Total Orders</div>
                <div className="text-3xl font-bold text-gray-900">
                  {stats.orders.totalOrders || 0}
                </div>
              </div>
              <div className="text-4xl">📦</div>
            </div>
          </div>

          {/* Total Revenue */}
          <div 
            onClick={() => navigate('/admin/transactions')}
            className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600 mb-2">Total Revenue</div>
                <div className="text-3xl font-bold text-green-600">
                  ৳{stats.orders.totalRevenue?.toFixed(0) || '0'}
                </div>
              </div>
              <div className="text-4xl">💰</div>
            </div>
          </div>

          {/* Total Products */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600 mb-2">Total Products</div>
                <div className="text-3xl font-bold text-purple-600">
                  {stats.totalProducts}
                </div>
              </div>
              <div className="text-4xl">🎯</div>
            </div>
          </div>

          {/* Total Users */}
          <div 
            onClick={() => navigate('/admin/users')}
            className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600 mb-2">Total Users</div>
                <div className="text-3xl font-bold text-orange-600">
                  {stats.totalUsers}
                </div>
              </div>
              <div className="text-4xl">👥</div>
            </div>
          </div>
        </div>

        {/* Secondary Stats - Product Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Indicators */}
          <div 
            onClick={() => navigate('/admin/indicators')}
            className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-3xl">📈</div>
              <div>
                <div className="text-sm text-gray-600">Indicators</div>
                <div className="text-2xl font-bold text-gray-900">{stats.indicators}</div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full" 
                style={{ width: stats.totalProducts ? `${(stats.indicators / stats.totalProducts) * 100}%` : '0%' }}
              ></div>
            </div>
          </div>

          {/* Strategies */}
          <div 
            onClick={() => navigate('/admin/strategies')}
            className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-3xl">🎯</div>
              <div>
                <div className="text-sm text-gray-600">Strategies</div>
                <div className="text-2xl font-bold text-gray-900">{stats.strategies}</div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-500 h-2 rounded-full" 
                style={{ width: stats.totalProducts ? `${(stats.strategies / stats.totalProducts) * 100}%` : '0%' }}
              ></div>
            </div>
          </div>
        </div>

        {/* Users Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">User Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              onClick={() => navigate('/admin/users')}
              className="bg-green-50 rounded-lg p-4 border border-green-200 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <div className="text-sm text-green-600 font-medium">Active Users</div>
              <div className="text-2xl font-bold text-green-700">{stats.activeUsers}</div>
            </div>
            <div 
              onClick={() => navigate('/admin/users')}
              className="bg-gray-50 rounded-lg p-4 border border-gray-200 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <div className="text-sm text-gray-600 font-medium">Inactive Users</div>
              <div className="text-2xl font-bold text-gray-700">{stats.totalUsers - stats.activeUsers}</div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Order Status Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div 
              onClick={() => navigate('/admin/transactions')}
              className="bg-green-50 rounded-lg p-4 border border-green-200 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <div className="text-sm text-green-600 font-medium">Completed</div>
              <div className="text-2xl font-bold text-green-700">{stats.orders.completedOrders || 0}</div>
            </div>
            <div 
              onClick={() => navigate('/admin/transactions')}
              className="bg-yellow-50 rounded-lg p-4 border border-yellow-200 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <div className="text-sm text-yellow-600 font-medium">Pending</div>
              <div className="text-2xl font-bold text-yellow-700">{stats.orders.pendingOrders || 0}</div>
            </div>
            <div 
              onClick={() => navigate('/admin/transactions')}
              className="bg-red-50 rounded-lg p-4 border border-red-200 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <div className="text-sm text-red-600 font-medium">Refunded</div>
              <div className="text-2xl font-bold text-red-700">{stats.orders.refundedOrders || 0}</div>
            </div>
            <div 
              onClick={() => navigate('/admin/transactions')}
              className="bg-gray-50 rounded-lg p-4 border border-gray-200 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <div className="text-sm text-gray-600 font-medium">Failed</div>
              <div className="text-2xl font-bold text-gray-700">0</div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}