// src/components/Footer.jsx
import React from 'react'
import partner1 from '../assets/partner1.png'
import partner2 from '../assets/partner2.png'
import partner3 from '../assets/partner3.png'

const Footer = React.forwardRef(({ footerRef }, ref) => {
  return (
    <footer ref={ref || footerRef} className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-slate-300 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-white font-extrabold text-2xl mb-4">NetVibeBD</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Premium mobile package provider focused on quality, trust & innovation. Your gateway to the best internet packages.
            </p>
            <div className="flex gap-4">
              {[partner1, partner2, partner3].map((p, i) => (
                <img 
                  key={i} 
                  src={p} 
                  className="h-12 w-12 object-contain opacity-70 hover:opacity-100 transition-opacity"
                  alt={`Partner ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Products Section */}
          <div>
            <h4 className="font-bold text-white text-lg mb-4">Products</h4>
            <ul className="space-y-3">
              <li>
                <a href="/" className="hover:text-white hover:underline transition-all text-sm">
                  Mobile Packages
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-white hover:underline transition-all text-sm">
                  Internet Packages
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-white hover:underline transition-all text-sm">
                  Special Offers
                </a>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h4 className="font-bold text-white text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <a href="/about" className="hover:text-white hover:underline transition-all text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white hover:underline transition-all text-sm">
                  Contact
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white hover:underline transition-all text-sm">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h4 className="font-bold text-white text-lg mb-4">Support</h4>
            <ul className="space-y-3">
              <li>
                <a href="/faq" className="hover:text-white hover:underline transition-all text-sm">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-white hover:underline transition-all text-sm">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-white hover:underline transition-all text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/refund" className="hover:text-white hover:underline transition-all text-sm">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-slate-700">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="text-sm font-semibold text-white">01931112866</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-slate-700">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-500 text-center sm:text-left">
              © {new Date().getFullYear()} NetVibeBD. All rights reserved.
            </p>
            <div className="flex gap-2">
              <span className="px-3 py-1.5 bg-slate-800 rounded-lg text-xs text-slate-300 border border-slate-700">bKash</span>
              <span className="px-3 py-1.5 bg-slate-800 rounded-lg text-xs text-slate-300 border border-slate-700">Nagad</span>
              <span className="px-3 py-1.5 bg-slate-800 rounded-lg text-xs text-slate-300 border border-slate-700">Rocket</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
})

Footer.displayName = 'Footer'

export default Footer
