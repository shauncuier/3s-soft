import React, { useEffect, useState } from "react";
import SectionLabel from "../../Components/SectionLabel";
import { Link } from "react-router-dom";
import axios from "axios";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/blogs`);
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching Blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
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
              tips, explore fresh ideas, and stay inspired through every stage
              of your personal and professional growth.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {/* Single Blog */}
            {blogs.map((blog) => (
              <div
                className="bg-[#1E2939] border border-gray-700 rounded-3xl flex flex-col justify-between overflow-hidden"
                key={blog._id}
              >
                <div className="">
                  <div className="">
                    <img
                      src={blog.imageUrl}
                      alt="Blog Image"
                      className="w-full h-full object-right"
                    />
                  </div>
                  <div className="px-5 py-5">
                    <div className="flex items-start mb-3">
                      <p className="inline-block text-xs bg-blue-400/40 px-2 py-1 rounded">
                        {blog.category || "Not Found"}
                      </p>
                    </div>

                    <h2 className="text-xl md:text-2xl text-blue-400">
                      {blog.title}
                    </h2>
                    <p className="mt-1">
                      {blog.details.split(" ").slice(0, 30).join(" ")}...
                      <Link to={`/blog/${blog._id}`} className="text-blue-500 underline">
                        Read More
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-1 justify-end text-xs mt-3 bg-blue-400/40 px-5 py-2 text-center font-semibold rounded">
                  <p>Author: {blog.author}</p>
                  <p>Post Data: {blog.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blogs;
