import React, { useState } from 'react'
import ProductCard from './ProductCard'
import Button from './Button'

function PackageSection({ 
  sectionRef, 
  title, 
  packages, 
  badgeText, 
  bgColor, 
  badgeColor,
  letter 
}) {
  const [showCount, setShowCount] = useState(3)

  return (
    <section ref={sectionRef} className={`py-12 md:py-16 bg-gradient-to-b ${bgColor} to-white`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 md:mb-12 text-center sm:text-left">
          <div className={`w-14 h-14 ${badgeColor.replace('bg-', 'text-')} bg-gradient-to-br ${badgeColor.replace('bg-', 'from-')} ${badgeColor} rounded-full flex items-center justify-center shadow-lg`}>
            <span className="text-white font-bold text-2xl">{letter}</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900">
              {title}
            </h2>
            <span className={`${badgeColor.replace('bg-', 'bg-')} bg-opacity-10 ${badgeColor.replace('bg-', 'text-')} px-3 py-1.5 rounded-full text-sm font-semibold`}>
              {badgeText}
            </span>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {packages.slice(0, showCount).map((pkg) => (
            <ProductCard key={pkg.id} product={pkg} />
          ))}
        </div>

        {/* Load More Button */}
        {showCount < packages.length && (
          <div className="text-center mt-8 md:mt-12">
            <Button 
              onClick={() => setShowCount(packages.length)}
              className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 text-white px-8 md:px-10 py-4 text-base md:text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200"
            >
              Load More ({packages.length - showCount} More)
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

export default PackageSection
