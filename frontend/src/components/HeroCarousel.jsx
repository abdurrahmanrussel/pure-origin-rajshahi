import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import slide1 from '../assets/1.png'
import slide2 from '../assets/2.png'
import slide3 from '../assets/3.png'
import slide4 from '../assets/4.png'
import 'swiper/css'
import 'swiper/css/pagination'

const HeroCarousel = () => {
  const slides = [
    {
      image: slide1,
    },
    {
      image: slide2,
    },
    {
      image: slide3,
    },
    {
      image: slide4,
    }
  ]

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      loop={slides.length > 1}
      className="h-80 md:h-[28rem] rounded-2xl shadow-2xl overflow-hidden"
    >
      {slides.map((slide, i) => (
        <SwiperSlide key={i}>
          <div className="relative w-full h-full">
            <img
              src={slide.image}
              alt={`Slide ${i + 1}`}
              loading={i === 0 ? 'eager' : 'lazy'}
              className="w-full h-full object-cover"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default HeroCarousel