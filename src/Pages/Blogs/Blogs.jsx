import React from "react";
import SectionLabel from "../../Components/SectionLabel";
import { Link } from "react-router-dom";
import { FaUserEdit, FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import PageTitle from "../../Components/PageTitle";
import blogs from "../../data/blogs.json";

const Blogs = () => {
  return (
    <>
      <section className="bg-gradient-to-br from-gray-900 via-black to-gray-900 transition-colors duration-300 px-4">
        <PageTitle
          title="Blogs | Digital Growth Insights, Web Dev & eCommerce Tips"
          content="Explore expert articles on MERN stack development, SEO audits, Amazon selling, and digital marketing strategies from the 3S-SOFT team."
        />
        <div className="max-w-[1480px] min-h-screen mx-auto pt-24 sm:pt-28 md:pt-38 pb-20">
          {/* Section Header */}
          <div className="text-center mb-16">
            <SectionLabel label={"Read Our Blogs"} />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Smart Reads for Smarter Growth
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
              Discover insightful articles from our expert team. Learn practical
              tips, explore fresh ideas, and stay inspired.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <article
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl flex flex-col overflow-hidden transition-all duration-500 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-2"
                key={blog._id}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <span className="absolute bottom-4 left-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {blog.category || "General"}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                    <span className="flex items-center gap-1.5">
                      <FaUserEdit className="text-blue-400" /> {blog.author}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FaCalendarAlt className="text-blue-400" /> {blog.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                    {blog.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-grow">
                    {blog.details.split("\n")[0]}
                  </p>

                  {/* Read More Button */}
                  <Link
                    to={`/blog/${blog.slug}`}
                    className="inline-flex items-center gap-2 text-blue-400 font-semibold text-sm group-hover:gap-3 transition-all duration-300"
                  >
                    Read Article <FaArrowRight className="text-xs" />
                  </Link>
                </div>

                {/* Tags Footer */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className="px-6 pb-5 pt-0">
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="bg-blue-500/10 text-blue-300 px-2.5 py-1 rounded-full text-xs font-medium border border-blue-500/20"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blogs;
