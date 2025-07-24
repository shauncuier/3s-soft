import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionLabel from "../../Components/SectionLabel";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination, Autoplay, Keyboard } from "swiper/modules";

import testimonialsData from "../../data/testimonials.json";
import { FaQuoteRight } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";

const Testimonials = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 py-20 px-5">
      <section className="max-w-[1480px] mx-auto">
        <div className="flex flex-col items-center justify-center text-center">
          <SectionLabel label={"Client Success Stories"} />
          <h2 className="text-5xl font-bold">What Our Clients Say About Us</h2>
          <p className="text-xl w-1/2 mx-auto mt-5 text-gray-300">
            Don't just take our word for it. Here's what our satisfied clients
            have to say about their experience working with 3S-SOFT.
          </p>
        </div>
        <Swiper
          cssMode={true}
          navigation={true}
          pagination={true}
          keyboard={true}
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[Navigation, Pagination, Autoplay, Keyboard]}
          className="mySwiper max-w-4xl bg-gray-800 rounded-3xl shadow-2xl border border-gray-700 mt-15"
        >
          {testimonialsData.map((testimonial) => (
            <SwiperSlide key={testimonial.id} className="px-15 py-16">
              {/* Quote Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <FaQuoteRight className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="flex items-center justify-center">
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-xl italic my-6 font-light">
                "{testimonial.testimonial}"
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-15 h-15 rounded-full ring-3 ring-blue-900">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full rounded-full"
                  />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-bold">{testimonial.name}</h3>
                  <h5 className="text-base font-medium text-blue-400">
                    {testimonial.position}
                  </h5>
                  <p className="text-sm text-gray-400">{testimonial.company}</p>
                </div>
              </div>
              {/* Project Tag */}
              <div className="mt-6">
                <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-400 px-4 py-2 rounded-full text-sm font-medium">
                  {testimonial.project}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default Testimonials;
