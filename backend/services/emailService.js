import { Resend } from 'resend'

// Lazy Resend client creation - only create when first email is sent
let resendClient = null

const getResendClient = () => {
  if (!resendClient) {
    const RESEND_API_KEY = process.env.RESEND_API_KEY
    
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY not configured in environment variables')
    }
    
    resendClient = new Resend(RESEND_API_KEY)
  }
  return resendClient
}

// Read BASE_URL dynamically to ensure it's always current
const getBaseUrl = () => process.env.BASE_URL || process.env.FRONTEND_URL || 'http://localhost:5173'

// Send password reset email
export const sendPasswordResetEmail = async (email, resetToken) => {
  try {
    console.log('[EmailService] Starting password reset email with Resend...')
    console.log('[EmailService] RESEND_API_KEY set:', !!process.env.RESEND_API_KEY)
    console.log('[EmailService] BASE_URL:', getBaseUrl())
    console.log('[EmailService] Email to:', email)
    
    const resetUrl = `${getBaseUrl()}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`
    console.log('[EmailService] Reset URL:', resetUrl)

    const data = await getResendClient().emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to: email,
      subject: 'Password Reset Request',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .header h1 { margin: 0; font-size: 28px; font-weight: bold; }
            .header p { margin: 10px 0 0 0; opacity: 0.9; font-size: 16px; }
            .content { padding: 40px 30px; background: #ffffff; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
            .content p { margin-bottom: 20px; color: #555; }
            .button { display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 8px; margin: 25px 0; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(102, 126, 234, 0.4); transition: all 0.3s ease; }
            .button:hover { transform: translateY(-2px); box-shadow: 0 6px 12px rgba(102, 126, 234, 0.5); }
            .link-box { background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
            .link-text { color: #667eea; font-size: 13px; word-break: break-all; margin: 0; }
            .warning { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 8px; }
            .warning p { margin: 0; color: #92400e; font-size: 14px; }
            .footer { padding: 30px 20px; text-align: center; font-size: 13px; color: #888; }
            .divider { height: 1px; background: #e5e7eb; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔐 Reset Your Password</h1>
              <p>Secure your account with a new password</p>
            </div>
            <div class="content">
              <p>Hello,</p>
              <p>We received a request to reset your password for your NetVibeBD account. Click the button below to create a new password:</p>
              
              <p style="text-align: center;">
                <a href="${resetUrl}" class="button">Reset My Password</a>
              </p>
              
              <div class="link-box">
                <p style="margin: 0 0 8px 0; font-weight: 600; color: #667eea; font-size: 13px;">Or copy and paste this link:</p>
                <p class="link-text">${resetUrl}</p>
              </div>
              
              <div class="warning">
                <p><strong>⏱️ Link expires in 1 hour</strong><br>
                For your security, this link will expire after 1 hour. If you don't use it, you'll need to request a new password reset.</p>
              </div>
              
              <div class="divider"></div>
              
              <p style="font-size: 14px; color: #888;">If you didn't request this password reset, you can safely ignore this email. Your account remains secure.</p>
              
              <p style="font-size: 14px; color: #888;">Need help? Contact us at <strong>01931112866</strong></p>
            </div>
            <div class="footer">
              <div class="divider"></div>
              <p>© 2024 NetVibeBD. All rights reserved.</p>
              <p style="font-size: 12px; margin-top: 10px;">This is an automated email. Please do not reply.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    console.log(`Password reset email sent to ${email}`, data)
    return true
  } catch (error) {
    console.error('Error sending password reset email:', error)
    throw new Error('Failed to send password reset email')
  }
}

// Send email verification email
export const sendVerificationEmail = async (email, verificationToken, name) => {
  try {
    console.log('[EmailService] Starting verification email with Resend...')
    console.log('[EmailService] RESEND_API_KEY set:', !!process.env.RESEND_API_KEY)
    console.log('[EmailService] BASE_URL:', getBaseUrl())
    console.log('[EmailService] Email to:', email)
    console.log('[EmailService] Name:', name)
    
    const verifyUrl = `${getBaseUrl()}/verify-email?token=${verificationToken}&email=${encodeURIComponent(email)}`
    console.log('[EmailService] Verify URL:', verifyUrl)

    const data = await getResendClient().emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to: email,
      subject: 'Verify Your Email Address',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: white; padding: 40px 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .header h1 { margin: 0; font-size: 28px; font-weight: bold; }
            .header p { margin: 10px 0 0 0; opacity: 0.9; font-size: 16px; }
            .content { padding: 40px 30px; background: #ffffff; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
            .content p { margin-bottom: 20px; color: #555; }
            .button { display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: white; text-decoration: none; border-radius: 8px; margin: 25px 0; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(16, 185, 129, 0.4); transition: all 0.3s ease; }
            .button:hover { transform: translateY(-2px); box-shadow: 0 6px 12px rgba(16, 185, 129, 0.5); }
            .link-box { background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10B981; }
            .link-text { color: #10B981; font-size: 13px; word-break: break-all; margin: 0; }
            .info { background: #dbeafe; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0; border-radius: 8px; }
            .info p { margin: 0; color: #1e40af; font-size: 14px; }
            .footer { padding: 30px 20px; text-align: center; font-size: 13px; color: #888; }
            .divider { height: 1px; background: #e5e7eb; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📧 Verify Your Email Address</h1>
              <p>Welcome to NetVibeBD!</p>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              <p>Thank you for creating an account with NetVibeBD! We're excited to have you on board.</p>
              <p>To get started, please verify your email address by clicking the button below:</p>
              
              <p style="text-align: center;">
                <a href="${verifyUrl}" class="button">Verify My Email</a>
              </p>
              
              <div class="link-box">
                <p style="margin: 0 0 8px 0; font-weight: 600; color: #10B981; font-size: 13px;">Or copy and paste this link:</p>
                <p class="link-text">${verifyUrl}</p>
              </div>
              
              <div class="info">
                <p><strong>🔒 Why verify?</strong><br>
                Email verification helps us protect your account and ensure you receive important updates about your orders.</p>
              </div>
              
              <div class="divider"></div>
              
              <p style="font-size: 14px; color: #888;">If you didn't create an account with NetVibeBD, you can safely ignore this email.</p>
              
              <p style="font-size: 14px; color: #888;">Need help? Contact us at <strong>01931112866</strong></p>
            </div>
            <div class="footer">
              <div class="divider"></div>
              <p>© 2024 NetVibeBD. All rights reserved.</p>
              <p style="font-size: 12px; margin-top: 10px;">This is an automated email. Please do not reply.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    console.log(`Verification email sent to ${email}`, data)
    return true
  } catch (error) {
    console.error('Error sending verification email:', error)
    throw new Error('Failed to send verification email')
  }
}

// Send payment confirmation email to customer
export const sendPaymentConfirmationEmail = async (email, orderDetails) => {
  try {
    console.log('[EmailService] Starting payment confirmation email with Resend...')
    console.log('[EmailService] RESEND_API_KEY set:', !!process.env.RESEND_API_KEY)
    console.log('[EmailService] Email to:', email)
    console.log('[EmailService] Order details:', orderDetails)
    
    const baseUrl = getBaseUrl()
    const dashboardUrl = `${baseUrl}/dashboard`
    
    const data = await getResendClient().emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to: email,
      subject: 'Order Received - NetVibeBD',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: white; padding: 40px 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .header h1 { margin: 0; font-size: 28px; font-weight: bold; }
            .header p { margin: 10px 0 0 0; opacity: 0.9; font-size: 16px; }
            .content { padding: 40px 30px; background: #ffffff; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
            .content p { margin-bottom: 20px; color: #555; }
            .order-details { background: #f8fafc; padding: 25px; border-radius: 10px; margin: 25px 0; border: 2px solid #e5e7eb; }
            .order-detail-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e5e7eb; margin-bottom: 12px; }
            .order-detail-row:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
            .label { font-weight: 600; color: #374151; font-size: 14px; }
            .value { color: #111827; font-size: 14px; }
            .button { display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: white; text-decoration: none; border-radius: 8px; margin: 25px 0; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(16, 185, 129, 0.4); transition: all 0.3s ease; }
            .button:hover { transform: translateY(-2px); box-shadow: 0 6px 12px rgba(16, 185, 129, 0.5); }
            .info { background: #dbeafe; border-left: 4px solid #3b82f6; padding: 20px; margin: 20px 0; border-radius: 8px; }
            .info p { margin: 0; color: #1e40af; font-size: 14px; line-height: 1.7; }
            .warning { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 20px 0; border-radius: 8px; }
            .warning p { margin: 0; color: #92400e; font-size: 14px; line-height: 1.7; }
            .footer { padding: 30px 20px; text-align: center; font-size: 13px; color: #888; }
            .divider { height: 1px; background: #e5e7eb; margin: 20px 0; }
            .success-banner { background: #d1fae5; border-left: 4px solid #10B981; padding: 20px; margin: 25px 0; border-radius: 8px; }
            .success-banner p { margin: 0; color: #065f46; font-size: 14px; font-weight: 500; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📦 Order Confirmed</h1>
              <p>Thank you for your purchase!</p>
            </div>
            <div class="content">
              <p>Dear ${orderDetails.customerName || 'Customer'},</p>
              <p>Great news! Your order has been successfully received. We're processing it now and will activate your package shortly.</p>
              
              <div class="success-banner">
                <p><strong>✅ Order Status: Pending Verification</strong></p>
              </div>
              
              <div class="order-details">
                <div style="margin-bottom: 20px; font-weight: 600; color: #111827; font-size: 16px;">Order Details</div>
                
                <div class="order-detail-row">
                  <span class="label">Order ID</span>
                  <span class="value">${orderDetails.orderId}</span>
                </div>
                
                <div class="order-detail-row">
                  <span class="label">Product</span>
                  <span class="value">${orderDetails.productName}</span>
                </div>
                
                <div class="order-detail-row">
                  <span class="label">Amount</span>
                  <span class="value">৳${orderDetails.amount.toFixed(2)}</span>
                </div>
                
                <div class="order-detail-row">
                  <span class="label">Package Number</span>
                  <span class="value">${orderDetails.offerNumber || 'N/A'}</span>
                </div>
                
                <div class="order-detail-row">
                  <span class="label">Transaction ID</span>
                  <span class="value">${orderDetails.transactionId || 'N/A'}</span>
                </div>
                
                <div class="order-detail-row">
                  <span class="label">Date</span>
                  <span class="value">${new Date(orderDetails.date).toLocaleString()}</span>
                </div>
              </div>
              
              <div class="info">
                <p><strong>📌 Package Activation Timeline</strong><br><br>
                We're verifying your payment now. Package activation typically takes 1-2 hours maximum.<br><br>
                If you don't receive activation after 2 hours, please contact us at <strong>01931112866</strong>.</p>
              </div>
              
              <div class="warning">
                <p><strong>⚠️ Important Refund Policy</strong><br><br>
                Refunds are not possible if:<br>
                • Recharge has already been completed<br>
                • More than 24 hours have passed since purchase<br><br>
                Please contact us immediately if you have any issues.</p>
              </div>
              
              <p>Track your order and view your purchases anytime from your dashboard:</p>
              
              <p style="text-align: center;">
                <a href="${dashboardUrl}" class="button">View My Dashboard</a>
              </p>
              
              <div class="divider"></div>
              
              <p style="font-size: 14px; color: #888;">Have questions? Our support team is here to help. Contact us at <strong>01931112866</strong></p>
              
              <p style="font-size: 14px; color: #888;">Thank you for choosing NetVibeBD!</p>
            </div>
            <div class="footer">
              <div class="divider"></div>
              <p>© 2024 NetVibeBD. All rights reserved.</p>
              <p style="font-size: 12px; margin-top: 10px;">This is an automated email. Please do not reply.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    console.log(`✅ Payment confirmation email sent to ${email}`, data)
    return true
  } catch (error) {
    console.error('Error sending payment confirmation email:', error)
    throw new Error('Failed to send payment confirmation email')
  }
}

// Alias for backward compatibility
export const sendEmailVerificationEmail = sendVerificationEmail

export default {
  sendPasswordResetEmail,
  sendVerificationEmail,
  sendEmailVerificationEmail,
  sendPaymentConfirmationEmail,
}