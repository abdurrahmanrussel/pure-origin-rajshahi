
import MainLayout from '../layouts/MainLayout'

export default function RefundPage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-16 px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8">
          Refund Policy
        </h1>
        <div className="prose prose-lg max-w-none">
          {/* --- Refund Policy Sections --- */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Refund Eligibility</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              NetVibeBD offers refunds for eligible packages under specific conditions. Refund eligibility is 
              determined based on following criteria:
            </p>
            <ul className="space-y-2 text-gray-700 list-disc list-inside">
              <li>Package has not been activated on your mobile number</li>
              <li>Refund request is made within 24 hours of purchase</li>
              <li>Payment verification was successful but package activation failed</li>
              <li>Technical issue on our end prevented package activation</li>
              <li>Package was activated on incorrect number due to our error</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Non-Refundable Situations</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Refunds are not available in following situations:
            </p>
            <ul className="space-y-2 text-gray-700 list-disc list-inside">
              <li>Package has been successfully activated on your number</li>
              <li>Refund request is made after 24 hours of purchase</li>
              <li>Package was not activated due to incorrect information provided by you</li>
              <li>Package was activated on wrong number due to user error</li>
              <li>Payment was not completed or verified</li>
              <li>Package is incompatible with your network or number type</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Refund Process</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              To request a refund, follow these steps:
            </p>
            <ol className="space-y-2 text-gray-700 list-decimal list-inside">
              <li>Contact our support team via phone, WhatsApp, or Facebook</li>
              <li>Provide your order ID, email address, and reason for refund request</li>
              <li>Our team will verify your eligibility within 24-48 hours</li>
              <li>If approved, refund will be processed within 3-5 business days</li>
              <li>Refund will be made to original payment method</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Refund Timeframe</h2>
            <p className="text-gray-700 leading-relaxed">
              Once your refund is approved, processing time depends on your payment method:
            </p>
            <ul className="space-y-2 text-gray-700 list-disc list-inside mt-3">
              <li><strong>bKash/Nagad/Rocket:</strong> 1-2 business days</li>
              <li><strong>Bank Transfer:</strong> 3-5 business days</li>
              <li><strong>Other methods:</strong> 3-7 business days</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Partial Refunds</h2>
            <p className="text-gray-700 leading-relaxed">
              Partial refunds may be considered in exceptional circumstances, such as when a package 
              is partially activated or when there was a technical issue that affected only part of the 
              service. These cases are reviewed on a case-by-case basis.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Exchange Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              Package exchanges are not available. If you wish to purchase a different package, you must 
              request a refund for your current purchase (if eligible) and then purchase the desired 
              package separately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Refund Request Form</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              When contacting us for a refund, please have following information ready:
            </p>
            <ul className="space-y-2 text-gray-700 list-disc list-inside">
              <li>Order ID (found in your purchase history)</li>
              <li>Email address used for purchase</li>
              <li>Mobile number (package activation number)</li>
              <li>Transaction ID</li>
              <li>Reason for refund request</li>
              <li>Any supporting documentation or screenshots</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Denied Refunds</h2>
            <p className="text-gray-700 leading-relaxed">
              If your refund request is denied, you will receive a detailed explanation. You may appeal 
              the decision by providing additional information or evidence to support your claim. Our support 
              team will review appeals within 48 hours.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact for Refunds</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              To request a refund, please contact our support team:
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

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Policy Changes</h2>
            <p className="text-gray-700 leading-relaxed">
              NetVibeBD reserves the right to modify this refund policy at any time. Changes will be 
              posted on this page with an effective date. Refund requests will be processed according to 
              policy in effect at time of purchase unless otherwise stated.
            </p>
          </section>
        </div>
      </div>
    </MainLayout>
  )
}
