import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MarqueeStrip from './components/MarqueeStrip'
import About from './components/About'
import Products from './components/Products'
import WhyUs from './components/WhyUs'
import HowToOrder from './components/HowToOrder'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'

export default function App() {
  return (
    <div style={{ background: 'var(--c-900)' }}>
      <Navbar />
      <Hero />
      <MarqueeStrip />
      <About />
      <Products />
      <WhyUs />
      <HowToOrder />
      <Testimonials />
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}
