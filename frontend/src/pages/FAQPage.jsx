
import React, { useState } from 'react'
import MainLayout from '../layouts/MainLayout'

export default function FAQPage() {
  const faqs = [
    {
      question: 'How do I purchase a mobile package?',
      answer: 'Simply browse our packages, select the one you want, and click "Buy Now". You\'ll be prompted to complete payment through bKash, Nagad, Rocket, or Bank Transfer. Once payment is verified, your package will be activated within 1-2 hours.'
    },
    {
      question: 'How long does package activation take?',
      answer: 'Most packages are activated within 1-2 hours after payment verification. During peak times, activation may take up to 24 hours. You\'ll receive a notification once your package is activated.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept bKash, Nagad, Rocket, and Bank Transfer. All payments are processed securely. Please ensure you enter the correct transaction ID after making payment.'
    },
    {
      question: 'What is the package activation number?',
      answer: 'The package activation number is the mobile number where you want your package to be activated. Make sure to enter the correct number during checkout to ensure your package is activated on the right SIM.'
    },
    {
      question: 'Can I get a refund if I\'m not satisfied?',
      answer: 'Yes, we offer refunds for eligible packages. Please check our Refund Policy for detailed information on eligibility and the refund process. Contact our support team for assistance.'
    },
    {
      question: 'How do I track my order?',
      answer: 'After logging into your account, you can view all your purchases and their status in the "Purchases" section of your dashboard. You can also check your transaction history there.'
    },
    {
      question: 'What if my package is not activated?',
      answer: 'If your package is not activated within 24 hours of payment verification, please contact our support team immediately. We\'ll investigate and resolve the issue as quickly as possible.'
    },
    {
      question: 'Can I purchase multiple packages?',
      answer: 'Yes, you can purchase multiple packages for different numbers or multiple packages for the same number. Each package will be listed separately in your purchases.'
    },
    {
      question: 'Do you offer promo codes or discounts?',
      answer: 'Yes! We regularly offer promo codes and discounts. Check our website for current offers, or follow our social media for exclusive deals. Enter promo codes during checkout for instant discounts.'
    },
    {
      question: 'Is my payment information secure?',
      answer: 'Absolutely! We use secure payment processing and never store your payment details. All transactions are encrypted and processed through trusted payment gateways.'
    }
  ]

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-16 px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 text-center">
          Frequently Asked Questions
        </h1>
        <p className="text-xl text-gray-600 text-center mb-12">
          Find answers to common questions about our services
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} />
          ))}
        </div>

        <div className="mt-12 text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h2>
          <p className="text-gray-700 mb-6">
            Can't find the answer you're looking for? Contact our support team for personalized assistance.
          </p>
          <a 
            href="/contact"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
          >
            Contact Support
          </a>
        </div>
      </div>
    </MainLayout>
  )
}

function FAQItem({ faq }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100 hover:border-gray-200 transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 text-left flex justify-between items-center gap-4 hover:bg-gray-50 transition-colors"
      >
        <span className="text-lg font-semibold text-gray-900 pr-4">
          {faq.question}
        </span>
        <svg
          className={`w-6 h-6 flex-shrink-0 text-gray-500 transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 pb-5 border-t border-gray-100 pt-4">
          <p className="text-gray-700 leading-relaxed">
            {faq.answer}
          </p>
        </div>
      )}
    </div>
  )
}