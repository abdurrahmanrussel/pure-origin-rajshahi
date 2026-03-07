import React from 'react'
import MainLayout from '../layouts/MainLayout'

export default function TermsPage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-16 px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8">
          Terms of Service
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using NetVibeBD services, you accept and agree to be bound by the terms and 
              provision of this agreement. If you do not agree to abide by the above, please do not use our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Service Description</h2>
            <p className="text-gray-700 leading-relaxed">
              NetVibeBD provides mobile internet packages for Robi, Airtel, and Banglalink networks in Bangladesh. 
              We strive to activate packages within 1-2 hours of payment verification, though this may vary during peak times.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Responsibilities</h2>
            <ul className="space-y-2 text-gray-700 list-disc list-inside">
              <li>Provide accurate and up-to-date information during registration and purchase</li>
              <li>Enter the correct package activation number (phone number) during checkout</li>
              <li>Ensure sufficient funds in your payment account before purchasing</li>
              <li>Report any issues with package activation within 24 hours</li>
              <li>Use our services in compliance with applicable laws and regulations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Payment Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We accept payments through bKash, Nagad, Rocket, and Bank Transfer. All payments must be made in full 
              before package activation. You must provide a valid transaction ID after payment completion.
            </p>
            <p className="text-gray-700 leading-relaxed">
              NetVibeBD reserves the right to verify all payments before activating any package. Payments found to be 
              fraudulent or unauthorized will be reported to authorities.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Package Activation</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Package activation typically takes 1-2 hours but may extend to 24 hours during peak periods. 
              Activation is performed on the mobile number provided during checkout.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Once activated, packages cannot be transferred to another number. Please ensure you provide the correct 
              package activation number during purchase.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Refund Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              Refunds are available for eligible packages under specific conditions. Please refer to our detailed 
              Refund Policy for complete information on refund eligibility and the refund process.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              NetVibeBD shall not be held liable for any indirect, incidental, special, consequential, or punitive 
              damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              NetVibeBD reserves the right to modify these terms at any time. We will notify users of significant 
              changes through our website or other communication channels. Your continued use of our services after 
              such modifications constitutes your acceptance of the new terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              If you have any questions about these Terms of Service, please contact us:
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
