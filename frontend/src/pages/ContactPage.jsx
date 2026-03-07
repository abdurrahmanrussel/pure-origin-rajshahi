import React from 'react'
import MainLayout from '../layouts/MainLayout'

const ContactPage = () => {
  const phoneNumber = '01931112866'
  const whatsappLink = `https://wa.me/88${phoneNumber}`
  const facebookUrl = 'https://www.facebook.com/Rahul.Hasan.2866'

  return (
    <MainLayout>
      <div className="min-h-screen py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 md:mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-3 md:mb-4">
              Get In Touch
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 px-2">
              We'd love to hear from you. Reach out to us through any channel below!
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Phone/WhatsApp Card */}
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 border border-gray-200">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-5 md:mb-6 shadow-lg">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-3">
                  Phone & WhatsApp
                </h2>
                <p className="text-xl md:text-2xl font-semibold text-green-600 mb-5 md:mb-6">
                  {phoneNumber}
                </p>
                <div className="flex flex-col gap-3 w-full">
                  <a
                    href={`tel:${phoneNumber}`}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-4 md:py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                    Call Now
                  </a>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-4 md:py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Facebook Card */}
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 border border-gray-200">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mb-5 md:mb-6 shadow-lg">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-3">
                  Facebook
                </h2>
                <p className="text-base md:text-lg text-gray-600 mb-5 md:mb-6">
                  Connect with us on Facebook
                </p>
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-4 md:py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Visit Our Page
                </a>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-10 md:mt-16 text-center">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-6 md:p-8 border-2 border-purple-100">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">
                Need Help?
              </h3>
              <p className="text-base md:text-lg text-gray-600 mb-3 md:mb-4 px-2">
                Our team is available to assist you with any questions about our mobile packages, purchases, or account issues.
              </p>
              <p className="text-base md:text-lg text-gray-600 px-2">
                Contact us via phone, WhatsApp, or Facebook for fastest response!
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 md:mt-12 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/"
              className="px-8 py-4 md:py-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 text-center"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default ContactPage
