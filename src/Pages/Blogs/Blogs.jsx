import React from "react";
import SectionLabel from "../../Components/SectionLabel";
import { Link } from "react-router";
import blogImage from "../../assets/blog-img-2.jpg";
import blogImage2 from "../../assets/blog-img-1.jpg";

const Blogs = () => {
  return (
    <section className="bg-gray-900 transition-colors duration-300 px-4">
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
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {/* Single Blog */}
          <div className="bg-[#1E2939] border border-gray-700 rounded-3xl flex flex-col overflow-hidden">
            <div className="">
              <img
                src={blogImage}
                alt="Blog Image"
                className="w-full h-full object-right"
              />
            </div>
            <div className="px-5 py-5">
              <div className="flex items-center justify-between text-xs mb-3 text-blue-200">
                <p>Author: Risan</p>
                <p>Post Data: 24/07/2025</p>
              </div>
              <Link to={"/blogs/react-js"} className="">
                <h2 className="text-xl md:text-2xl text-blue-400">
                  Mastering React: A Beginner’s Guide to Building Dynamic Web
                  Apps
                </h2>
              </Link>
              <p className="mt-4">
                Start your journey into the powerful world of React.js with this
                comprehensive and beginner-friendly guide. Start your journey
                into the powerful world of React.js with this comprehensive and
                beginner-friendly guide.{" "}
                <Link
                  to={"/blogs/react-js"}
                  className="text-blue-500 underline"
                >
                  Read More
                </Link>
              </p>
            </div>
          </div>
          {/* Single Blog */}
          <div className="bg-[#1E2939] border border-gray-700 rounded-3xl flex flex-col overflow-hidden">
            <div className="">
              <img
                src={blogImage2}
                alt="Blog Image"
                className="w-full h-full object-right"
              />
            </div>
            <div className="px-5 py-5">
              <Link to={"/blogs/react-js"} className="">
                <h2 className="text-xl md:text-2xl text-blue-400">
                  Mastering React: A Beginner’s Guide to Building Dynamic Web
                  Apps
                </h2>
              </Link>
              <p className="mt-4">
                Start your journey into the powerful world of React.js with this
                comprehensive and beginner-friendly guide. Start your journey
                into the powerful world of React.js with this comprehensive and
                beginner-friendly guide.{" "}
                <Link
                  to={"/blogs/react-js"}
                  className="text-blue-500 underline"
                >
                  Read More
                </Link>
              </p>
            </div>
          </div>
          {/* Single Blog */}
          <div className="bg-[#1E2939] border border-gray-700 rounded-3xl flex flex-col overflow-hidden">
            <div className="">
              <img
                src={blogImage}
                alt="Blog Image"
                className="w-full h-full object-right"
              />
            </div>
            <div className="px-5 py-5">
              <Link to={"/blogs/react-js"} className="">
                <h2 className="text-xl md:text-2xl text-blue-400">
                  Mastering React: A Beginner’s Guide to Building Dynamic Web
                  Apps
                </h2>
              </Link>
              <p className="mt-4">
                Start your journey into the powerful world of React.js with this
                comprehensive and beginner-friendly guide. Start your journey
                into the powerful world of React.js with this comprehensive and
                beginner-friendly guide.{" "}
                <Link
                  to={"/blogs/react-js"}
                  className="text-blue-500 underline"
                >
                  Read More
                </Link>
              </p>
            </div>
          </div>
          {/* Single Blog */}
          <div className="bg-[#1E2939] border border-gray-700 rounded-3xl flex flex-col overflow-hidden">
            <div className="">
              <img
                src={blogImage2}
                alt="Blog Image"
                className="w-full h-full object-right"
              />
            </div>
            <div className="px-5 py-5">
              <Link to={"/blogs/react-js"} className="">
                <h2 className="text-xl md:text-2xl text-blue-400">
                  Mastering React: A Beginner’s Guide to Building Dynamic Web
                  Apps
                </h2>
              </Link>
              <p className="mt-4">
                Start your journey into the powerful world of React.js with this
                comprehensive and beginner-friendly guide. Start your journey
                into the powerful world of React.js with this comprehensive and
                beginner-friendly guide.{" "}
                <Link
                  to={"/blogs/react-js"}
                  className="text-blue-500 underline"
                >
                  Read More
                </Link>
              </p>
            </div>
          </div>
          {/* Single Blog */}
          <div className="bg-[#1E2939] border border-gray-700 rounded-3xl flex flex-col overflow-hidden">
            <div className="">
              <img
                src={blogImage}
                alt="Blog Image"
                className="w-full h-full object-right"
              />
            </div>
            <div className="px-5 py-5">
              <Link to={"/blogs/react-js"} className="">
                <h2 className="text-xl md:text-2xl text-blue-400">
                  Mastering React: A Beginner’s Guide to Building Dynamic Web
                  Apps
                </h2>
              </Link>
              <p className="mt-4">
                Start your journey into the powerful world of React.js with this
                comprehensive and beginner-friendly guide. Start your journey
                into the powerful world of React.js with this comprehensive and
                beginner-friendly guide.{" "}
                <Link
                  to={"/blogs/react-js"}
                  className="text-blue-500 underline"
                >
                  Read More
                </Link>
              </p>
            </div>
          </div>
          {/* Single Blog */}
          <div className="bg-[#1E2939] border border-gray-700 rounded-3xl flex flex-col overflow-hidden">
            <div className="">
              <img
                src={blogImage2}
                alt="Blog Image"
                className="w-full h-full object-right"
              />
            </div>
            <div className="px-5 py-5">
              <Link to={"/blogs/react-js"} className="">
                <h2 className="text-xl md:text-2xl text-blue-400">
                  Mastering React: A Beginner’s Guide to Building Dynamic Web
                  Apps
                </h2>
              </Link>
              <p className="mt-4">
                Start your journey into the powerful world of React.js with this
                comprehensive and beginner-friendly guide. Start your journey
                into the powerful world of React.js with this comprehensive and
                beginner-friendly guide.{" "}
                <Link
                  to={"/blogs/react-js"}
                  className="text-blue-500 underline"
                >
                  Read More
                </Link>
              </p>
            </div>
          </div>
          {/* Single Blog */}
          <div className="bg-[#1E2939] border border-gray-700 rounded-3xl flex flex-col overflow-hidden">
            <div className="">
              <img
                src={blogImage}
                alt="Blog Image"
                className="w-full h-full object-right"
              />
            </div>
            <div className="px-5 py-5">
              <Link to={"/blogs/react-js"} className="">
                <h2 className="text-xl md:text-2xl text-blue-400">
                  Mastering React: A Beginner’s Guide to Building Dynamic Web
                  Apps
                </h2>
              </Link>
              <p className="mt-4">
                Start your journey into the powerful world of React.js with this
                comprehensive and beginner-friendly guide. Start your journey
                into the powerful world of React.js with this comprehensive and
                beginner-friendly guide.{" "}
                <Link
                  to={"/blogs/react-js"}
                  className="text-blue-500 underline"
                >
                  Read More
                </Link>
              </p>
            </div>
          </div>
          {/* Single Blog */}
          <div className="bg-[#1E2939] border border-gray-700 rounded-3xl flex flex-col overflow-hidden">
            <div className="">
              <img
                src={blogImage2}
                alt="Blog Image"
                className="w-full h-full object-right"
              />
            </div>
            <div className="px-5 py-5">
              <Link to={"/blogs/react-js"} className="">
                <h2 className="text-xl md:text-2xl text-blue-400">
                  Mastering React: A Beginner’s Guide to Building Dynamic Web
                  Apps
                </h2>
              </Link>
              <p className="mt-4">
                Start your journey into the powerful world of React.js with this
                comprehensive and beginner-friendly guide. Start your journey
                into the powerful world of React.js with this comprehensive and
                beginner-friendly guide.{" "}
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
