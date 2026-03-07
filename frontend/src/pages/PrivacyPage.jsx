import React from 'react'
import MainLayout from '../layouts/MainLayout'

export default function PrivacyPage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-16 px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8">
          Privacy Policy
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              At NetVibeBD, we value your privacy. This Privacy Policy outlines how we collect, use, and 
              protect your personal information when you use our services. By using our platform, you agree to 
              the terms of this policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed mb-3">We may collect the following types of information:</p>
            <ul className="space-y-2 text-gray-700 list-disc list-inside">
              <li><strong>Personal Information:</strong> Name, email address, phone number, and package activation number</li>
              <li><strong>Account Information:</strong> Username, password (encrypted), and account preferences</li>
              <li><strong>Transaction Information:</strong> Payment details, transaction IDs, and purchase history</li>
              <li><strong>Device Information:</strong> IP address, browser type, and device characteristics</li>
              <li><strong>Usage Data:</strong> Pages visited, features used, and time spent on our platform</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <ul className="space-y-2 text-gray-700 list-disc list-inside">
              <li>Process and activate your purchased mobile packages</li>
              <li>Provide customer support and respond to your inquiries</li>
              <li>Send important notifications about your orders and account</li>
              <li>Improve our services and user experience</li>
              <li>Communicate about promotions, updates, and new features</li>
              <li>Comply with legal obligations and protect our rights</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We implement industry-standard security measures to protect your information:
            </p>
            <ul className="space-y-2 text-gray-700 list-disc list-inside">
              <li>SSL/TLS encryption for all data transmissions</li>
              <li>Secure password hashing and storage</li>
              <li>Regular security audits and updates</li>
              <li>Restricted access to personal data</li>
              <li>Secure payment processing through trusted gateways</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              However, no method of transmission over internet or electronic storage is 100% secure. While we 
              strive to protect your personal data, we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Information Sharing</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We do not sell, trade, or rent your personal information. We may share your information only in 
              the following circumstances:
            </p>
            <ul className="space-y-2 text-gray-700 list-disc list-inside">
              <li><strong>Service Providers:</strong> Third-party companies that assist us in operating our platform</li>
              <li><strong>Payment Processors:</strong> To process your payments securely</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with merger, sale, or transfer of assets</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              You have the following rights regarding your personal information:
            </p>
            <ul className="space-y-2 text-gray-700 list-disc list-inside">
              <li>Access, update, or delete your personal information</li>
              <li>Opt out of marketing communications</li>
              <li>Request a copy of your personal data</li>
              <li>Object to or restrict processing of your data</li>
              <li>Withdraw consent at any time (where applicable)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies and Tracking</h2>
            <p className="text-gray-700 leading-relaxed">
              We use cookies and similar technologies to enhance your experience, analyze trends, and track user 
              movements. You can configure your browser to refuse cookies, but some features may not function properly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Our services are not intended for children under 18. We do not knowingly collect personal 
              information from children. If we discover that such information has been collected, we will take 
              steps to remove it.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by 
              posting the new policy on this page. You are advised to review this Privacy Policy periodically.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              If you have any questions about this Privacy Policy, please contact us:
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
