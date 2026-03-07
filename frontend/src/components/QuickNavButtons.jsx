import React from 'react'
import Button from './Button'

function QuickNavButtons({ refs }) {
  const { robiRef, airtelRef, banglalinkRef, gpRef, skittoRef, ryzeRef } = refs

  const navItems = [
    { name: 'Robi', ref: robiRef, color: 'from-pink-500 to-pink-600', hoverColor: 'from-pink-600 to-pink-700' },
    { name: 'Airtel', ref: airtelRef, color: 'from-red-500 to-red-600', hoverColor: 'from-red-600 to-red-700' },
    { name: 'Banglalink', ref: banglalinkRef, color: 'from-orange-500 to-orange-600', hoverColor: 'from-orange-600 to-orange-700' },
    { name: 'GP', ref: gpRef, color: 'from-green-500 to-green-600', hoverColor: 'from-green-600 to-green-700' },
    { name: 'Skitto', ref: skittoRef, color: 'from-purple-500 to-purple-600', hoverColor: 'from-purple-600 to-purple-700' },
    { name: 'Ryze', ref: ryzeRef, color: 'from-indigo-500 to-indigo-600', hoverColor: 'from-indigo-600 to-indigo-700' },
  ]

  return (
    <div className="grid grid-cols-3 gap-3 md:gap-4">
      {navItems.map((item, index) => (
        <Button
          key={index}
          onClick={() => item.ref.current?.scrollIntoView({ behavior: 'smooth' })}
          className={`bg-gradient-to-r ${item.color} hover:${item.hoverColor} text-white px-4 py-4 md:px-6 md:py-3 rounded-2xl shadow-lg active:scale-95 transition-all duration-200 font-bold text-sm md:text-base`}
        >
          {item.name}
        </Button>
      ))}
    </div>
  )
}

export default QuickNavButtons
