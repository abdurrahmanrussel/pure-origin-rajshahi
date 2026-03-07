import nodemailer from 'nodemailer'

// Lazy transporter creation - only create when first email is sent
let transporter = null

const getTransporter = () => {
  if (!transporter) {
    const EMAIL_USER = process.env.EMAIL_USER
    const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD
    
    if (!EMAIL_USER || !EMAIL_PASSWORD) {
      throw new Error('Email credentials not configured in environment variables')
    }
    
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
      },
    })
  }
  return transporter
}

// Read BASE_URL dynamically to ensure it's always current
const getBaseUrl = () => process.env.BASE_URL || process.env.FRONTEND_URL || 'http://localhost:5173'

// Send password reset email
export const sendPasswordResetEmail = async (email, resetToken) => {
  try {
    console.log('[EmailService] Starting password reset email...')
    console.log('[EmailService] EMAIL_USER:', process.env.EMAIL_USER)
    console.log('[EmailService] EMAIL_PASSWORD set:', !!process.env.EMAIL_PASSWORD)
    console.log('[EmailService] BASE_URL:', getBaseUrl())
    console.log('[EmailService] Email to:', email)
    
    const resetUrl = `${getBaseUrl()}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`
    console.log('[EmailService] Reset URL:', resetUrl)

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #4F46E5; color: white; padding: 20px; text-align: center; }
            .content { padding: 30px 20px; background: #f9fafb; }
            .button { display: inline-block; padding: 12px 24px; background: #4F46E5; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔐 Password Reset Request</h1>
            </div>
            <div class="content">
              <p>Hi there,</p>
              <p>You requested to reset your password. Click the button below to create a new password:</p>
              <p style="text-align: center;">
                <a href="${resetUrl}" class="button">Reset Password</a>
              </p>
              <p>Or copy and paste this link into your browser:</p>
              <p style="word-break: break-all; color: #4F46E5; font-size: 14px;">${resetUrl}</p>
              <p><strong>⚠️ Important:</strong> This link will expire in 1 hour for security.</p>
              <p>If you didn't request this, please ignore this email.</p>
            </div>
            <div class="footer">
              <p>© 2024 NetVibeBD. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    }

    const mailTransporter = getTransporter()
    await mailTransporter.sendMail(mailOptions)
    console.log(`Password reset email sent to ${email}`)
    return true
  } catch (error) {
    console.error('Error sending password reset email:', error)
    throw new Error('Failed to send password reset email')
  }
}

// Send email verification email
export const sendVerificationEmail = async (email, verificationToken, name) => {
  try {
    console.log('[EmailService] Starting verification email...')
    console.log('[EmailService] EMAIL_USER:', process.env.EMAIL_USER)
    console.log('[EmailService] EMAIL_PASSWORD set:', !!process.env.EMAIL_PASSWORD)
    console.log('[EmailService] BASE_URL:', getBaseUrl())
    console.log('[EmailService] Email to:', email)
    console.log('[EmailService] Name:', name)
    
    const verifyUrl = `${getBaseUrl()}/verify-email?token=${verificationToken}&email=${encodeURIComponent(email)}`
    console.log('[EmailService] Verify URL:', verifyUrl)

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your Email Address',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #10B981; color: white; padding: 20px; text-align: center; }
            .content { padding: 30px 20px; background: #f9fafb; }
            .button { display: inline-block; padding: 12px 24px; background: #10B981; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📧 Verify Your Email</h1>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
            <p>Thanks for creating an account with NetVibeBD!</p>
            <p>Please verify your email address by clicking the button below:</p>
              <p style="text-align: center;">
                <a href="${verifyUrl}" class="button">Verify Email</a>
              </p>
              <p>Or copy and paste this link into your browser:</p>
              <p style="word-break: break-all; color: #10B981; font-size: 14px;">${verifyUrl}</p>
              <p>Verifying your email helps us keep your account secure.</p>
              <p>If you didn't create an account, please ignore this email.</p>
            </div>
            <div class="footer">
              <p>© 2024 NetVibeBD. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    }

    const mailTransporter = getTransporter()
    await mailTransporter.sendMail(mailOptions)
    console.log(`Verification email sent to ${email}`)
    return true
  } catch (error) {
    console.error('Error sending verification email:', error)
    throw new Error('Failed to send verification email')
  }
}

// Send payment confirmation email to customer
export const sendPaymentConfirmationEmail = async (email, orderDetails) => {
  try {
    console.log('[EmailService] Starting payment confirmation email...')
    console.log('[EmailService] EMAIL_USER:', process.env.EMAIL_USER)
    console.log('[EmailService] EMAIL_PASSWORD set:', !!process.env.EMAIL_PASSWORD)
    console.log('[EmailService] Email to:', email)
    console.log('[EmailService] Order details:', orderDetails)
    
    const baseUrl = getBaseUrl()
    const dashboardUrl = `${baseUrl}/dashboard`
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: 'Order Received - NetVibeBD',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #10B981; color: white; padding: 20px; text-align: center; }
            .content { padding: 30px 20px; background: #f9fafb; }
            .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10B981; }
            .button { display: inline-block; padding: 12px 24px; background: #10B981; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
            .label { font-weight: bold; color: #555; }
            .value { color: #333; margin-bottom: 10px; }
            .warning { background: #FEF3C7; border-left: 4px solid #F59E0B; padding: 15px; margin: 20px 0; border-radius: 4px; }
            .info { background: #DBEAFE; border-left: 4px solid #3B82F6; padding: 15px; margin: 20px 0; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📦 Order Received</h1>
            </div>
            <div class="content">
              <p>Dear ${orderDetails.customerName || 'Customer'},</p>
              <p>Thank you for your purchase! Your order has been received.</p>
              
              <div class="order-details">
                <div class="label">Order ID:</div>
                <div class="value">${orderDetails.orderId}</div>
                
                <div class="label">Product:</div>
                <div class="value">${orderDetails.productName}</div>
                
                <div class="label">Amount:</div>
                <div class="value">৳${orderDetails.amount.toFixed(2)}</div>
                
                <div class="label">Package Activation Number:</div>
                <div class="value">${orderDetails.offerNumber || 'N/A'}</div>
                
                <div class="label">Transaction ID / Last 4 Digits:</div>
                <div class="value">${orderDetails.transactionId || 'N/A'}</div>
                
                <div class="label">Date:</div>
                <div class="value">${new Date(orderDetails.date).toLocaleString()}</div>
              </div>
              
              <div class="info">
                <p><strong>📌 Package Activation:</strong></p>
                <p>We will verify your payment and activate the package soon.</p>
                <p>It can take 1-2 hours maximum. If you don't receive after 2 hours, please contact us at <strong>01931112866</strong>.</p>
              </div>
              
              <div class="warning">
                <p><strong>⚠️ Refund Policy:</strong></p>
                <p>Refund will not be possible if recharge is already done or after 24 hours of purchase. Please contact us immediately if you have any issues.</p>
              </div>
              
              <p>You can access your purchase and track your orders from your dashboard:</p>
              <p style="text-align: center;">
                <a href="${dashboardUrl}" class="button">View Your Dashboard</a>
              </p>
              
              <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
              
              <p>Thank you for choosing NetVibeBD!</p>
            </div>
            <div class="footer">
              <p>© 2024 NetVibeBD. All rights reserved.</p>
              <p>This is an automated email, please do not reply.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    }

    const mailTransporter = getTransporter()
    await mailTransporter.sendMail(mailOptions)
    console.log(`✅ Payment confirmation email sent to ${email}`)
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