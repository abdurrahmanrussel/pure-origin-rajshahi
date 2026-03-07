import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FloatingChatbot from '../components/FloatingChatbot'

export default function MainLayout({ children, showAllProducts, footerRef }) {
  return (
    <>
      <Navbar showAllProducts={showAllProducts} />
      <main>{children}</main>
      <Footer footerRef={footerRef} />
      <FloatingChatbot />
    </>
  )
}
