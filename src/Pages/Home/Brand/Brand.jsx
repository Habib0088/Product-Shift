import React from "react";
// import Swiper JS
import { motion } from "framer-motion";


import { Swiper, SwiperSlide } from "swiper/react";

// import Swiper styles
import "swiper/css";

import p1 from "../../../assets/brands/amazon.png";
import p2 from "../../../assets/brands/amazon_vector.png";
import p3 from "../../../assets/brands/casio.png";
import p4 from "../../../assets/brands/moonstar.png";
import p5 from "../../../assets/brands/randstad.png";
import p6 from "../../../assets/brands/star.png";
import p7 from "../../../assets/brands/start_people.png";
import { Autoplay, Pagination } from "swiper/modules";
const Brand = () => {
  const brands = [p1, p2, p3, p4, p5, p6, p7];
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2 }}
      style={{  padding: "10px", margin: "10px 0" }}
    > <h1 className="text-2xl font-bold text-center">Our Proud Sponsor</h1>
      <Swiper
        slidesPerView={4}
        centeredSlides={true}
        spaceBetween={30}
        loop={true}
        grabCursor={true}
        autoplay={{
          delay: 900,
          disableOnInteraction: false,
          pauseOnMouseEnter:true
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper  mt-12"
      >
       
        {brands.map((brand) => (
          <SwiperSlide>
            <img src={brand} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default Brand;
