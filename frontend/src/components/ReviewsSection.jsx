import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import ReviewCard from './ReviewCard'
import { reviews } from '../data/reviews'

function ReviewsSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50" id="reviews">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600">
            Real reviews from satisfied customers
          </p>
        </div>
        
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="pb-12"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <ReviewCard {...review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default ReviewsSection