import React from 'react'
import Button from './Button'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProductCard({ product, bgColor = 'bg-white' }) {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const handleBuyNow = (productId) => {
    if (!isAuthenticated) {
      alert('Please login to purchase this product')
      navigate('/login')
      return
    }
    navigate(`/product/${productId}?checkout=true`)
  }

  return (
    <div
      className={`${bgColor} rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 border border-gray-200 mobile-card`}
    >
      {/* Image Container */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-52 w-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-base font-bold shadow-lg">
          ৳{product.price}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5 space-y-4">
        <h3 className="text-xl font-extrabold text-gray-900 line-clamp-2 leading-tight">
          {product.name}
        </h3>
        
        {/* Features */}
        <div className="space-y-3">
          {product.features?.slice(0, 3).map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3 text-sm text-gray-700">
              <div className="mt-0.5 flex-shrink-0">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="leading-relaxed">{feature}</span>
            </div>
          ))}
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => navigate(`/product/${product.id}`)}
            className="flex-1 bg-white border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-700 py-3.5 text-base font-bold rounded-2xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
          >
            View Details
          </button>
          <Button 
            onClick={() => handleBuyNow(product.id)}
            className="flex-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white py-3.5 text-base font-bold rounded-2xl shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200"
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
