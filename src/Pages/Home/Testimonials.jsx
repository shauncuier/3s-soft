import React, { useEffect, useState } from "react";
import SectionLabel from "../../Components/SectionLabel";
import testimonialsData from "../../data/testimonials.json";
import { FaQuoteRight } from "react-icons/fa6";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || testimonialsData.length <= 1) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) =>
        currentIndex === testimonialsData.length - 1 ? 0 : currentIndex + 1
      );
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [isPaused]);

  const goToPrevious = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? testimonialsData.length - 1 : currentIndex - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === testimonialsData.length - 1 ? 0 : currentIndex + 1
    );
  };

  const activeTestimonial = testimonialsData[activeIndex];

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 transition-colors duration-300 py-20 px-5">
      <section className="max-w-[1480px] mx-auto">
        <div className="flex flex-col items-center justify-center text-center">
          <SectionLabel label={"Client Success Stories"} />
          <h2 className="text-4xl sm:text-5xl font-bold">What Our Clients Say About Us</h2>
          <p className="text-xl md:w-3/4 lg:w-1/2 mx-auto mt-5 text-gray-300">
            Don't just take our word for it. Here's what our satisfied clients
            have to say about their experience working with 3S-SOFT.
          </p>
        </div>
        <div
          className="max-w-4xl bg-gray-800 rounded-3xl shadow-2xl border border-gray-700 mt-15 mx-auto overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="px-6 md:px-15 py-12 md:py-16" aria-live="polite">
            <div className="flex items-center justify-between gap-4 mb-8">
              <button
                type="button"
                onClick={goToPrevious}
                className="h-11 w-11 rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
                aria-label="Show previous testimonial"
              >
                <FaChevronLeft className="mx-auto" />
              </button>

              <div className="flex justify-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <FaQuoteRight className="h-8 w-8 text-white" />
                </div>
              </div>

              <button
                type="button"
                onClick={goToNext}
                className="h-11 w-11 rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
                aria-label="Show next testimonial"
              >
                <FaChevronRight className="mx-auto" />
              </button>
            </div>

            <div className="flex items-center justify-center">
              {Array.from({ length: activeTestimonial.rating }, (_, index) => (
                <FaStar key={index} className="text-yellow-400" />
              ))}
            </div>

            <p className="text-xl italic my-6 font-light text-center min-h-36 md:min-h-28">
              "{activeTestimonial.testimonial}"
            </p>

            <div className="flex items-center justify-center gap-4">
              <div className="w-15 h-15 rounded-full ring-3 ring-blue-900 overflow-hidden">
                <img
                  src={activeTestimonial.image}
                  alt={activeTestimonial.name}
                  className="w-full rounded-full"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold">{activeTestimonial.name}</h3>
                <h5 className="text-base font-medium text-blue-400">
                  {activeTestimonial.position}
                </h5>
                <p className="text-sm text-gray-400">{activeTestimonial.company}</p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <span className="inline-block bg-blue-900/30 text-blue-400 px-4 py-2 rounded-full text-sm font-medium">
                {activeTestimonial.project}
              </span>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2">
              {testimonialsData.map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                  className={`h-2.5 rounded-full transition-all ${
                    index === activeIndex
                      ? "w-8 bg-blue-500"
                      : "w-2.5 bg-white/30 hover:bg-white/50"
                  }`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
