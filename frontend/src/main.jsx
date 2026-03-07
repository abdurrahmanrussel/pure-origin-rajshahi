// src/main.jsx
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import App from './App'
import MainLayout from './layouts/MainLayout'
import ProductPage from './pages/ProductPage'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import FAQPage from './pages/FAQPage'
import TermsPage from './pages/TermsPage'
import PrivacyPage from './pages/PrivacyPage'
import RefundPage from './pages/RefundPage'
import SuccessPage from './pages/SuccessPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import VerifyEmailPage from './pages/VerifyEmailPage'
import AccountSettingsPage from './pages/AccountSettingsPage'
import AdminPage from './pages/AdminPage'
import AdminLayout from './layouts/AdminLayout'
import AdminDashboard from './pages/admin/Dashboard'
import AdminUsers from './pages/admin/Users'
import AdminTransactions from './pages/admin/Transactions'
import UserLayout from './layouts/UserLayout'
import UserDashboard from './pages/user/Dashboard'
import UserPurchases from './pages/user/Purchases'
import UserTransactions from './pages/user/Transactions'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './context/AuthContext'
import './styles/global.css'

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }, [pathname])

  return null
}

// Admin Route Component - checks if user is admin
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    )
  }
  
  if (!user || user.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">You don't have permission to access this page.</p>
          <a href="/" className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
            Go to Home
          </a>
        </div>
      </div>
    )
  }
  
  return children
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout><App /></MainLayout>} />
        <Route path="/product/:id" element={<MainLayout><ProductPage /></MainLayout>} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/refund" element={<RefundPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<MainLayout><ForgotPasswordPage /></MainLayout>} />
        <Route path="/reset-password" element={<MainLayout><ResetPasswordPage /></MainLayout>} />
        <Route path="/verify-email" element={<MainLayout><VerifyEmailPage /></MainLayout>} />
        <Route path="/account/settings" element={<MainLayout><AccountSettingsPage /></MainLayout>} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="transactions" element={<AdminTransactions />} />
        </Route>
        
        {/* User Dashboard Routes */}
        <Route path="/dashboard" element={<UserLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path="purchases" element={<UserPurchases />} />
          <Route path="transactions" element={<UserTransactions />} />
        </Route>
      </Routes>
    </AuthProvider>
  </BrowserRouter>
)