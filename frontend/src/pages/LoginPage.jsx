import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import MainLayout from '../layouts/MainLayout'

const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [needsVerification, setNeedsVerification] = useState(false)
  const [resendEmail, setResendEmail] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
    setApiError('')
  }

  const handleResendVerification = async () => {
    setIsLoading(true)
    setApiError('')
    setSuccessMessage('')

    try {
      const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:4242'
      const emailToSend = resendEmail || formData.email
      
      console.log('[Resend Verification] Sending to:', emailToSend)
      console.log('[Resend Verification] Backend URL:', backendUrl)
      
      // Validate email before sending
      if (!emailToSend || !/\S+@\S+\.\S+/.test(emailToSend)) {
        setApiError('Please enter a valid email address')
        setIsLoading(false)
        return
      }
      
      // Use public endpoint that doesn't require authentication
      const response = await fetch(`${backendUrl}/api/auth/resend-verification-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailToSend }),
      })

      console.log('[Resend Verification] Response status:', response.status)
      
      let data
      try {
        data = await response.json()
        console.log('[Resend Verification] Response data:', data)
      } catch (jsonError) {
        console.error('[Resend Verification] Failed to parse JSON:', jsonError)
        data = { message: response.statusText || 'Unknown error' }
      }

      if (!response.ok) {
        setApiError(data.error || data.message || 'Failed to resend verification email')
        return
      }

      setSuccessMessage('Verification email sent successfully! Please check your inbox.')
    } catch (error) {
      console.error('Resend verification error:', error)
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      })
      setApiError('Network error. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setNeedsVerification(false) // Reset verification state

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setApiError('')

    try {
      const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:4242'
      const response = await fetch(`${backendUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        // Handle email verification requirement
        if (data.needsEmailVerification) {
          setNeedsVerification(true)
          setResendEmail(data.email || formData.email)
          setApiError(data.error || 'Please verify your email address before logging in.')
          return
        }

        // Handle validation errors
        if (data.details) {
          const newErrors = {}
          data.details.forEach(detail => {
            const fieldName = detail.path[0]
            newErrors[fieldName] = detail.msg
          })
          setErrors(newErrors)
        } else {
          setApiError(data.error || 'Login failed')
        }
        return
      }

      // Login successful - pass both access token and refresh token
      login(data.token, data.user, data.refreshToken)
      setSuccessMessage('Login Successful')
      
      // Show success message for 1.5 seconds then navigate
      setTimeout(() => {
        navigate('/')
      }, 1500)
    } catch (error) {
      console.error('Login error:', error)
      setApiError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <MainLayout>
      <div className="max-w-md mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              create a new account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {apiError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {apiError}
            </div>
          )}

          {needsVerification && (
            <div className="mb-4 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-md">
              <div className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div className="flex-1">
                  <p className="font-semibold mb-1">Email Verification Required</p>
                  <p className="text-sm mb-3">Please verify your email address before logging in. Check your inbox for the verification link.</p>
                  <button
                    type="button"
                    onClick={handleResendVerification}
                    disabled={isLoading}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium underline disabled:opacity-50"
                  >
                    {isLoading ? 'Sending...' : 'Resend verification email'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
              {successMessage}
            </div>
          )}

          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className={`block w-full px-3 py-2 pr-10 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="•••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                  tabIndex="-1"
                >
                  {showPassword ? (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <Link
              to="/forgot-password"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Forgot your password?
            </Link>
          </div>
        </form>
        </div>
      </div>
    </MainLayout>
  )
}

export default LoginPage