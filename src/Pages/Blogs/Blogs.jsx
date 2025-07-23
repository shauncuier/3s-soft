import React from "react";
import SectionLabel from "../../Components/SectionLabel";
import { Link } from "react-router";
import blogImage from "../../assets/blog-img-2.jpg";
import blogImage2 from "../../assets/blog-img-1.jpg";

const Blogs = () => {
  return (
    <section className="bg-gray-900 transition-colors duration-300">
      <div className="max-w-[1480px] min-h-screen mx-auto pt-24 sm:pt-28 md:pt-38 pb-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          <SectionLabel label={"Read Our Blogs"} />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Smart Reads for Smarter Growth
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover insightful articles from our expert team. Learn practical
            tips, explore fresh ideas, and stay inspired through every stage of
            your personal and professional growth.
          </p>
        </div>
        <div className="max-w-3/4 mx-auto space-y-6">
          <div className="bg-black/50 backdrop-blur-3xl border border-gray-700 rounded-3xl flex gap-5 overflow-hidden">
            <div className="">
              <img
                src={blogImage}
                alt=""
                className="w-full h-full object-right"
              />
            </div>
            <div className="pr-10 py-5">
              <h2 className="text-3xl text-blue-500">
                Mastering React: A Beginner’s Guide to Building Dynamic Web Apps
              </h2>
              <p className="mt-4 text-justify">
                Start your journey into the powerful world of React.js with this
                comprehensive and beginner-friendly guide. Whether you're
                completely new to frontend development or transitioning from
                another framework, this post will walk you through the
                fundamental building blocks of React — including components,
                JSX, state, and props — in a clear and approachable way. By the
                end, you'll not only understand how React works under the hood,
                but you'll also build your very first dynamic and interactive
                web application from scratch. It's the perfect starting point
                for aspiring developers ready to dive into modern JavaScript and
                create user experiences that truly stand out.{" "}
                <Link
                  to={"/blogs/react-js"}
                  className="text-blue-500 underline"
                >
                  Read More
                </Link>
              </p>
            </div>
          </div>
          <div className="bg-black/50 backdrop-blur-3xl border border-gray-700 rounded-3xl flex gap-5 overflow-hidden">
            <div className="">
              <img
                src={blogImage2}
                alt=""
                className="w-full h-full object-right"
              />
            </div>
            <div className="pr-10 py-5">
              <h2 className="text-3xl text-blue-500">
                Mastering React: A Beginner’s Guide to Building Dynamic Web Apps
              </h2>
              <p className="mt-4 text-justify">
                Start your journey into the powerful world of React.js with this
                comprehensive and beginner-friendly guide. Whether you're
                completely new to frontend development or transitioning from
                another framework, this post will walk you through the
                fundamental building blocks of React — including components,
                JSX, state, and props — in a clear and approachable way. By the
                end, you'll not only understand how React works under the hood,
                but you'll also build your very first dynamic and interactive
                web application from scratch. It's the perfect starting point
                for aspiring developers ready to dive into modern JavaScript and
                create user experiences that truly stand out.{" "}
                <Link
                  to={"/blogs/react-js"}
                  className="text-blue-500 underline"
                >
                  Read More
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
