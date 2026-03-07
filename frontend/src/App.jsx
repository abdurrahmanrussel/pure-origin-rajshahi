import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import HeroCarousel from './components/HeroCarousel'
import PackageSection from './components/PackageSection'
import QuickNavButtons from './components/QuickNavButtons'
import ReviewsSection from './components/ReviewsSection'
import { getAllProducts, getProductsByType } from './data/products'
import { getTelecomPackagesByType } from './data/rarely_changed_products'

function App() {
  const navigate = useNavigate()
  
  // Get all products from frontend data
  const robiPackages = getProductsByType('robi')
  const airtelPackages = getProductsByType('airtel')
  const banglalinkPackages = getProductsByType('banglalink')
  
  // Get telecom packages
  const gpPackages = getTelecomPackagesByType('gp')
  const skittoPackages = getTelecomPackagesByType('skitto')
  const ryzePackages = getTelecomPackagesByType('ryze')
  
  // Section refs
  const robiRef = useRef(null)
  const airtelRef = useRef(null)
  const banglalinkRef = useRef(null)
  const gpRef = useRef(null)
  const skittoRef = useRef(null)
  const ryzeRef = useRef(null)

  // Scroll to top on load
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // Show all on navbar click
  const handleShowAllProducts = () => {
    if (robiRef.current) {
      robiRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const refs = {
    robiRef,
    airtelRef,
    banglalinkRef,
    gpRef,
    skittoRef,
    ryzeRef
  }

  return (
    <>
      {/* Hero Carousel */}
      <section className="py-6 md:py-8 px-4 sm:px-6 max-w-7xl mx-auto">
        <HeroCarousel />
      </section>

      {/* Quick Navigation */}
      <section className="py-10 md:py-12 px-4 sm:px-6 max-w-7xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 md:mb-4">
          Mobile Packages
        </h1>
        <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-6 md:mb-8 px-2">
          Best mobile internet packages from all major operators
        </p>
        <QuickNavButtons refs={refs} />
      </section>

      {/* Robi Packages */}
      <PackageSection
        sectionRef={robiRef}
        title="Robi Packages"
        packages={robiPackages}
        badgeText={`${robiPackages.length} Packages`}
        bgColor="from-pink-50"
        badgeColor="bg-pink-500"
        letter="R"
      />

      {/* Airtel Packages */}
      <PackageSection
        sectionRef={airtelRef}
        title="Airtel Packages"
        packages={airtelPackages}
        badgeText={`${airtelPackages.length} Packages`}
        bgColor="from-red-50"
        badgeColor="bg-red-500"
        letter="A"
      />

      {/* Banglalink Packages */}
      <PackageSection
        sectionRef={banglalinkRef}
        title="Banglalink Packages"
        packages={banglalinkPackages}
        badgeText={`${banglalinkPackages.length} Packages`}
        bgColor="from-orange-50"
        badgeColor="bg-orange-500"
        letter="BL"
      />

      {/* Grameenphone Packages */}
      <PackageSection
        sectionRef={gpRef}
        title="Grameenphone Packages"
        packages={gpPackages}
        badgeText={`${gpPackages.length} Packages`}
        bgColor="from-green-50"
        badgeColor="bg-green-500"
        letter="GP"
      />

      {/* Skitto Packages */}
      <PackageSection
        sectionRef={skittoRef}
        title="Skitto Packages"
        packages={skittoPackages}
        badgeText={`${skittoPackages.length} Packages`}
        bgColor="from-purple-50"
        badgeColor="bg-purple-500"
        letter="S"
      />

      {/* Ryze Packages */}
      <PackageSection
        sectionRef={ryzeRef}
        title="Ryze Packages"
        packages={ryzePackages}
        badgeText={`${ryzePackages.length} Packages`}
        bgColor="from-indigo-50"
        badgeColor="bg-indigo-500"
        letter="R"
      />

      {/* Reviews Section */}
      <ReviewsSection />
    </>
  )
}

export default App