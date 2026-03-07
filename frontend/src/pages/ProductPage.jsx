import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { useAuth } from '../context/AuthContext'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import ReactMarkdown from 'react-markdown'
import { getProductById } from '../data/products'
import { getTelecomPackageById } from '../data/rarely_changed_products'

export default function ProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const product = getProductById(id) || getTelecomPackageById(id)
  const [faqOpenIndex, setFaqOpenIndex] = useState(null)
  const [showFixedBuy, setShowFixedBuy] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('bkash')
  const [transactionId, setTransactionId] = useState('')
  const [offerNumber, setOfferNumber] = useState('')
  const [processingPayment, setProcessingPayment] = useState(false)
  const [paymentError, setPaymentError] = useState('')

  const topBuyRef = useRef(null)
  const footerRef = useRef(null)

  // Check for checkout URL parameter to auto-open payment modal
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('checkout') === 'true') {
      // Check if user is authenticated before showing payment modal
      if (!isAuthenticated) {
        alert('Please login to purchase this product')
        navigate('/login')
        return
      }
      
      setShowPaymentModal(true)
      // Remove checkout parameter from URL
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [isAuthenticated, navigate])

  // Normalize product properties (thumbnail -> image for consistency)
  const normalizedProduct = product ? {
    ...product,
    image: product.thumbnail || product.image || 'https://placehold.co/400x400/gray/white?text=No+Image'
  } : null

  // ================= BUY NOW FUNCTION =================
  const buyNow = (product) => {
    // Check if product exists
    if (!normalizedProduct) {
      alert('Product not found')
      navigate('/')
      return
    }
    
    // Check if user is authenticated
    if (!isAuthenticated) {
      alert('Please login to purchase this product')
      navigate('/login')
      return
    }
    
    // Show payment modal
    setShowPaymentModal(true)
  }

  // ================= PROCESS PAYMENT =================
  const processPayment = async () => {
    setProcessingPayment(true)
    setPaymentError('')

    try {
      const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:4242'
      const apiUrl = backendUrl.includes(window.location.origin) ? '/api/create-manual-payment' : `${backendUrl}/api/create-manual-payment`
      const token = localStorage.getItem('token')

      // Validate offer number (required)
      if (!offerNumber || offerNumber.trim().length < 11) {
        setPaymentError('Please enter a valid phone number for package activation')
        setProcessingPayment(false)
        return
      }

      // Validate transaction ID
      if (!transactionId || transactionId.trim().length < 3) {
        setPaymentError('Please enter a valid transaction ID')
        setProcessingPayment(false)
        return
      }

      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          productId: normalizedProduct.id,
          productName: normalizedProduct.name,
          originalPrice: normalizedProduct.price,
          paymentMethod,
          transactionId,
          offerNumber: offerNumber.trim()
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create order')
      }

      // Success - close modal and redirect to success page
      setShowPaymentModal(false)
      setTransactionId('')
      setPaymentMethod('bkash')
      
      // Navigate to success page
      navigate('/success')
    } catch (err) {
      console.error('Payment error:', err)
      setPaymentError(err.message || 'Failed to create order. Please try again.')
    } finally {
      setProcessingPayment(false)
    }
  }
  // ====================================================

  /* ================= COMMON FAQ ================= */
  const commonFaq = [
    { question: 'How do I activate my package?', answer: 'After payment verification, we will activate your package within 1-2 hours.' },
    { question: 'What payment methods do you accept?', answer: 'We accept bKash, Nagad, Rocket, and Bank Transfer.' },
    { question: 'How long does activation take?', answer: 'Usually 1-2 hours after payment verification. Peak times may take longer.' },
  ]

  // Combine product features with common FAQ
  const productFaq = [...(product?.features?.map(f => ({ question: f, answer: 'Included in this package' })) || []), ...commonFaq]

  /* ================= SCROLL LISTENER FOR FIXED BUTTON ================= */
  useEffect(() => {
    const handleScroll = () => {
      if (!topBuyRef.current || !footerRef.current) return
      
      const topBuyRect = topBuyRef.current.getBoundingClientRect()
      const footerRect = footerRef.current.getBoundingClientRect()
      
      // Show fixed button when top button is scrolled out of view
      // Hide fixed button when footer is visible
      const topButtonOutOfView = topBuyRect.bottom < 0
      const footerIsVisible = footerRect.top < window.innerHeight
      
      setShowFixedBuy(topButtonOutOfView && !footerIsVisible)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!normalizedProduct)
    return (
      <p className="text-center mt-32 text-xl text-gray-400 animate-pulse">
        Loading product...
      </p>
    )

  return (
    <>
      <div className={`max-w-7xl mx-auto py-16 px-6 space-y-8 ${showFixedBuy ? 'pb-36' : ''}`}>

        {/* ================= HEADER ================= */}
        <div className="md:flex md:items-center md:space-x-12 space-y-8 md:space-y-0">
          <div className="md:w-1/2 flex justify-center">
            <img
              src={normalizedProduct.image}
              alt={normalizedProduct.name}
              loading="lazy"
              className="w-full max-w-md rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
              {normalizedProduct.name}
            </h1>
            
            {/* ================= PRICE DISPLAY ================= */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-200 shadow-lg">
              <span className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                ৳{normalizedProduct.price}
              </span>
            </div>

            {/* ================= BUY NOW BUTTON ================= */}
            <div ref={topBuyRef}>
              <Button
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-10 py-5 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                onClick={() => buyNow(normalizedProduct)}
              >
                <span className="flex items-center justify-center gap-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Buy Now
                </span>
              </Button>
            </div>
          </div>
        </div>

        {/* ================= DESCRIPTION ================= */}
        <ReactMarkdown
          components={{
            p: ({ node, ...props }) => (
              <p className="text-gray-700 text-lg md:text-xl leading-relaxed tracking-wide" {...props} />
            ),
            h1: ({ node, ...props }) => <h1 className="text-4xl font-bold my-4" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-3xl font-bold my-3" {...props} />,
            li: ({ node, ...props }) => <li className="ml-6 list-disc" {...props} />,
          }}
        >
          {normalizedProduct.description}
        </ReactMarkdown>


        {/* ================= YOUTUBE ================= */}
        {normalizedProduct.youtube && (
          <section className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2 border-purple-200">
              Video Demo
            </h2>
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-xl">
              <iframe
                className="w-full h-full"
                loading="lazy"
                src={
                  normalizedProduct.youtube.includes('watch?v=')
                    ? normalizedProduct.youtube.replace('watch?v=', 'embed/')
                    : normalizedProduct.youtube
                }
                title={normalizedProduct.name}
                allowFullScreen
              />
            </div>
          </section>
        )}

        {/* ================= GALLERY ================= */}
        {normalizedProduct.gallery && normalizedProduct.gallery.length > 0 && (
          <section className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2 border-pink-200">
              Gallery
            </h2>
            <Swiper
              modules={[Pagination, Autoplay]}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={normalizedProduct.gallery.length > 1 ? { delay: 3000 } : false}
              loop={normalizedProduct.gallery.length > 1}
              className="rounded-2xl overflow-hidden shadow-lg"
            >
              {/* Main product image */}
              {normalizedProduct.image && (
                <SwiperSlide key="main">
                  <img
                    src={normalizedProduct.image}
                    alt={normalizedProduct.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-96 md:h-[28rem] object-cover rounded-2xl transform hover:scale-105 transition-transform duration-500"
                  />
                </SwiperSlide>
              )}
              {/* Additional gallery images */}
              {normalizedProduct.gallery.map((url, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={url}
                      alt={`${normalizedProduct.name} ${idx + 1}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-96 md:h-[28rem] object-cover rounded-2xl transform hover:scale-105 transition-transform duration-500"
                    />
                  </SwiperSlide>
              ))}
            </Swiper>
          </section>
        )}

        {/* ================= FAQ ================= */}
        {productFaq.length > 0 && (
          <section className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b pb-2 border-green-200">
              FAQ
            </h2>
            <ul className="space-y-2">
              {productFaq.map((item, idx) => (
                <li
                  key={idx}
                  className="border-b border-gray-200 py-2 cursor-pointer"
                  onClick={() =>
                    setFaqOpenIndex(faqOpenIndex === idx ? null : idx)
                  }
                >
                  <div className="flex justify-between items-center">
                    <span className="flex items-center text-lg md:text-xl text-gray-800 font-medium">
                      <span className="mr-3 flex flex-col justify-between h-4 w-4">
                        <span className="block h-[2px] w-full bg-gray-800"></span>
                        <span className="block h-[2px] w-full bg-gray-800"></span>
                        <span className="block h-[2px] w-full bg-gray-800"></span>
                      </span>
                      {item.question}
                    </span>
                    <span className="text-gray-500 text-xl md:text-2xl transform transition-transform duration-200">
                      {faqOpenIndex === idx ? '▲' : '▼'}
                    </span>
                  </div>
                  {faqOpenIndex === idx && (
                    <p className="mt-2 pl-8 text-gray-700 text-base md:text-lg">
                      {item.answer || 'No answer provided.'}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* Invisible footer for scroll detection */}
      <div ref={footerRef} className="h-1"></div>

      {/* ================= CONDITIONAL FIXED BOTTOM BUY BUTTON ================= */}
      {showFixedBuy && (
        <div className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-white/98 to-gray-50/98 backdrop-blur-xl border-t-2 border-gray-200 py-4 px-6 flex justify-center z-50 shadow-2xl">
          <div className="w-full max-w-4xl flex items-center justify-between gap-6 bg-white/80 rounded-2xl p-3 shadow-lg">
            {/* Product Image */}
            <div className="flex items-center gap-4 flex-2">
              <img
                src={normalizedProduct.image}
                alt={normalizedProduct.name}
                className="w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover shadow-md"
              />
              
              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-base md:text-lg truncate pr-2">
                  {normalizedProduct.name}
                </h3>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
                    ৳{normalizedProduct.price}
                  </span>
                </div>
              </div>
            </div>

            {/* Buy Now Button */}
            <Button
              className="flex-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 min-w-[140px]"
              onClick={() => buyNow(normalizedProduct)}
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Buy Now
              </span>
            </Button>
          </div>
        </div>
      )}

      {/* ================= PAYMENT MODAL ================= */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md my-8 p-4 sm:p-6 md:p-8 transform animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Complete Your Purchase</h2>
              <button
                onClick={() => {
                  setShowPaymentModal(false)
                  setPaymentError('')
                  setTransactionId('')
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {/* Order Summary */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border-2 border-blue-200">
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={normalizedProduct.image}
                    alt={normalizedProduct.name}
                    className="w-16 h-16 rounded-xl object-cover shadow-md"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{normalizedProduct.name}</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
                        ৳{normalizedProduct.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'bkash', name: 'bKash', color: 'pink' },
                    { id: 'nagad', name: 'Nagad', color: 'orange' },
                    { id: 'rocket', name: 'Rocket', color: 'purple' },
                    { id: 'bank', name: 'Bank', color: 'blue' },
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-4 rounded-xl border-2 font-semibold transition-all ${
                        paymentMethod === method.id
                          ? `border-${method.color}-500 bg-${method.color}-50 ring-2 ring-${method.color}-500`
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {method.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Instructions */}
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
                <h4 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Payment Instructions
                </h4>
                
                <div className="space-y-3">
                  {paymentMethod === 'bkash' && (
                    <div className="bg-white rounded-lg p-3 border border-yellow-300">
                      <p className="font-bold text-pink-600 mb-1">bKash - Personal Number</p>
                      <p className="text-lg font-bold text-gray-900">01931112866</p>
                      <p className="text-sm text-gray-700 mt-1">Send Money: ৳{normalizedProduct.price}</p>
                      <p className="text-xs text-gray-500">Enter Transaction ID below</p>
                    </div>
                  )}
                  
                  {paymentMethod === 'nagad' && (
                    <div className="bg-white rounded-lg p-3 border border-yellow-300">
                      <p className="font-bold text-orange-600 mb-1">Nagad - Personal Number</p>
                      <p className="text-lg font-bold text-gray-900">01931112866</p>
                      <p className="text-sm text-gray-700 mt-1">Send Money: ৳{normalizedProduct.price}</p>
                      <p className="text-xs text-gray-500">Enter Transaction ID below</p>
                    </div>
                  )}
                  
                  {paymentMethod === 'rocket' && (
                    <div className="bg-white rounded-lg p-3 border border-yellow-300">
                      <p className="font-bold text-purple-600 mb-1">Rocket - Personal Number</p>
                      <p className="text-lg font-bold text-gray-900">01931112866</p>
                      <p className="text-sm text-gray-700 mt-1">Send Money: ৳{normalizedProduct.price}</p>
                      <p className="text-xs text-gray-500">Enter Transaction ID below</p>
                    </div>
                  )}
                  
                  {paymentMethod === 'bank' && (
                    <div className="bg-white rounded-lg p-3 border border-yellow-300">
                      <p className="font-bold text-blue-600 mb-1">Bank Transfer</p>
                      <p className="text-sm text-gray-700"><strong>Bank:</strong> Islami Bank Bangladesh Ltd</p>
                      <p className="text-sm text-gray-700"><strong>Account:</strong> 2050 244 67 00366813</p>
                      <p className="text-sm text-gray-700"><strong>Name:</strong> Md. Abdur Rahman</p>
                      <p className="text-xs text-gray-500 mt-1">Transfer ৳{normalizedProduct.price} and enter reference number</p>
                    </div>
                  )}
                  
                  <ul className="text-sm text-yellow-900 space-y-1 mt-3 border-t border-yellow-300 pt-2">
                    <li>• Use "Send Money" for mobile banking</li>
                  </ul>
                </div>
              </div>

              {/* Offer Number Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Offer Number / Package Activation Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={offerNumber}
                  onChange={(e) => {
                    setOfferNumber(e.target.value)
                    setPaymentError('')
                  }}
                  placeholder="Enter phone number for package activation"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter mobile number where you want package activated
                </p>
              </div>

              {/* Transaction ID Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Transaction ID / Last 4 Digit
                </label>
                <input
                  type="text"
                  value={transactionId}
                  onChange={(e) => {
                    setTransactionId(e.target.value)
                    setPaymentError('')
                  }}
                  placeholder="Enter transaction ID or last 4 digits"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter your Transaction ID or last 4 digits of your phone number
                </p>
                {paymentError && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    {paymentError}
                  </p>
                )}
              </div>

              {/* Confirm Button */}
              <button
                onClick={processPayment}
                disabled={processingPayment}
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-6 py-4 text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {processingPayment ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Confirm Order
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}