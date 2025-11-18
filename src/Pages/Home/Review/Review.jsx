import React, { use } from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const Review = ({revierResponse}) => {
    const reviewData=use(revierResponse)
      
    return (
         <>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        loop={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 70,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination,Autoplay]}
        className="mySwiper"
      >
        {
            reviewData.map(review=><SwiperSlide>
          <div className="w-full max-w-sm bg-white shadow-xl rounded-2xl p-6">
      {/* Quote Icon */}
      <FaQuoteLeft className="text-3xl text-teal-300" />

      {/* Text */}
      <p className="text-gray-600 mt-3">
       {review.review}
      </p>

      {/* Dotted Line */}
      <div className="border-b border-dashed mt-4 mb-4"></div>

      {/* Profile */}
      <div className="flex items-center gap-3">
       
<img className='w-10 h-10 bg-teal-600 rounded-full' src={review.user_photoURL} alt="" />
        <div>
          <h3 className="font-semibold">{review.userName}</h3>
          <p className="text-gray-500 text-sm">Senior Product Designer</p>
        </div>
      </div>
    </div>

        </SwiperSlide>)
        }
       
      </Swiper>
    </>
    );
};

export default Review;