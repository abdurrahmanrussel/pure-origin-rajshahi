import React, { useState, useEffect } from 'react'
import logo from '../assets/logo.png'
import Button from './Button'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = ({ showAllProducts }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isAuthenticated, logout, hasRole } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate('/')
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div onClick={handleLogoClick} className="flex items-center gap-2 cursor-pointer">
            <img src={logo} alt="NetVibeBD Logo" className="h-8 w-8" />
            <span className="font-bold text-lg text-gray-900">NetVibeBD</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => navigate('/')} className="text-gray-700 hover:text-blue-600">Products</button>
            <a href="#reviews" className="text-gray-700 hover:text-blue-600">Reviews</a>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                {hasRole('admin') && <Link to="/admin" className="text-purple-600 font-medium">Admin</Link>}
                <Link to="/dashboard" className="text-green-600 font-medium">Dashboard</Link>
                <Link to="/account/settings" className="text-blue-600 font-medium">Settings</Link>
                <span className="text-gray-700">Hi, {user?.name}</span>
                <Button onClick={handleLogout} className="text-blue-600">Logout</Button>
              </>
            ) : (
              <>
                <Link to="/login"><Button className="text-blue-600">Login</Button></Link>
                <Link to="/register"><Button className="bg-blue-600 text-white">Sign Up</Button></Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed right-0 top-16 h-[calc(100vh-4rem)] w-80 max-w-[85vw] bg-white border-l shadow-lg overflow-y-auto">
          <nav className="px-4 py-4 space-y-3">
            <button onClick={() => { setMobileMenuOpen(false); navigate('/') }} className="block w-full text-left py-2 text-gray-700">Products</button>
            <button onClick={() => { setMobileMenuOpen(false); navigate('/#reviews') }} className="block w-full text-left py-2 text-gray-700">Reviews</button>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block w-full text-left py-2 text-gray-700">About Us</Link>
            <Link to="/faq" onClick={() => setMobileMenuOpen(false)} className="block w-full text-left py-2 text-gray-700">FAQ</Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block w-full text-left py-2 text-gray-700">Contact</Link>
            
            <div className="border-t pt-3 mt-3 space-y-2">
              <Link to="/terms" onClick={() => setMobileMenuOpen(false)} className="block w-full text-left py-2 text-sm text-gray-600">Terms & Conditions</Link>
              <Link to="/privacy" onClick={() => setMobileMenuOpen(false)} className="block w-full text-left py-2 text-sm text-gray-600">Privacy Policy</Link>
              <Link to="/refund" onClick={() => setMobileMenuOpen(false)} className="block w-full text-left py-2 text-sm text-gray-600">Refund Policy</Link>
            </div>

            <div className="border-t pt-3 mt-3 space-y-2">
              {isAuthenticated ? (
                <>
                  {hasRole('admin') && <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="block w-full text-left py-2 text-purple-600 font-medium">Admin Dashboard</Link>}
                  <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block w-full text-left py-2 text-green-600 font-medium">Dashboard</Link>
                  <Link to="/account/settings" onClick={() => setMobileMenuOpen(false)} className="block w-full text-left py-2 text-blue-600 font-medium">Settings</Link>
                  <div className="py-2 text-gray-700">
                    <span className="font-medium">Hi, {user?.name}</span>
                  </div>
                  <Button onClick={handleLogout} className="w-full bg-red-50 text-red-600">Logout</Button>
                </>
              ) : (
                <>
                  <div className="py-4 text-center bg-gray-50 rounded-lg">
                    <p className="font-medium text-gray-900">Welcome!</p>
                    <p className="text-sm text-gray-600">Sign in to access your account</p>
                  </div>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}><Button className="w-full border-2 border-blue-600 text-blue-600">Login</Button></Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}><Button className="w-full bg-blue-600 text-white">Sign Up</Button></Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar