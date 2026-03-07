import React from 'react'
import MainLayout from '../layouts/MainLayout'

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-16 px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8">
          About NetVibeBD
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              NetVibeBD is a premium mobile package provider focused on quality, trust, and innovation. 
              We strive to provide the best mobile internet packages for Robi, Airtel, and Banglalink 
              customers across Bangladesh.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <span>Fast and reliable package activation within 1-2 hours</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <span>Competitive pricing on all mobile packages</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <span>24/7 customer support</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <span>Secure payment options (bKash, Nagad, Rocket, Bank Transfer)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <span>100% customer satisfaction guarantee</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-gray-700 leading-relaxed">
              With years of experience in the mobile services industry, we understand what our customers need. 
              We combine cutting-edge technology with exceptional customer service to deliver a seamless 
              package purchasing experience. Our team is dedicated to ensuring that every customer gets 
              the best value for their money.
            </p>
          </section>

          <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              Have questions? We're here to help!
            </p>
            <div className="space-y-2">
              <p className="text-gray-700">
                <strong>Phone & WhatsApp:</strong> 01931112866
              </p>
              <p className="text-gray-700">
                <strong>Facebook:</strong> 
                <a href="https://www.facebook.com/Rahul.Hasan.2866" target="_blank" rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline">
                  facebook.com/Rahul.Hasan.2866
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  )
}
