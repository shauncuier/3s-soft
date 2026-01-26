import React, { useEffect, useState } from "react";
import PageTitle from "../../Components/PageTitle";
import SectionLabel from "../../Components/SectionLabel";
import { FaExternalLinkAlt, FaSearch } from "react-icons/fa";
import { Link } from "react-router";

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredPortfolio, setFilteredPortfolio] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    import("../../data/portfolio.json").then((data) => {
      setPortfolio(data.portfolio || []);
      setCategories(data.categories || []);
      setFilteredPortfolio(data.portfolio || []);
    });
  }, []);

  useEffect(() => {
    let filtered = portfolio;

    // Filter by category
    if (activeCategory !== "All") {
      filtered = filtered.filter((item) => item.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.technologies?.some((tech) => tech.toLowerCase().includes(query))
      );
    }

    setFilteredPortfolio(filtered);
  }, [activeCategory, searchQuery, portfolio]);

  return (
    <>
      <PageTitle
        title="Our Portfolio | 3S-SOFT Digital Agency"
        content="Explore our portfolio of successful web development, eCommerce, and digital marketing projects delivered to clients in the US, UK, and globally."
      />

      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 py-24 px-5">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-370 mx-auto relative z-10 text-center">
          <SectionLabel label="Our Work" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Projects That{" "}
            <span className="bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Deliver Results
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From startups to enterprises, we've helped businesses transform
            their digital presence and achieve measurable success.
          </p>

          {/* Search Bar */}
          <div className="mt-10 max-w-xl mx-auto relative">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search projects, technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>
        </div>
      </section>

      {/* Filter & Portfolio Grid */}
      <section className="bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-20 px-5 transition-colors duration-300">
        <div className="max-w-370 mx-auto">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 cursor-pointer ${activeCategory === category
                    ? "bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            Showing{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {filteredPortfolio.length}
            </span>{" "}
            projects
          </p>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPortfolio.map((item, index) => (
              <div
                key={item.id || index}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              >
                <Link to={`/portfolio/${item.slug}`}>
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Overlay with Tech Tags */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 text-center">
                      <div className="space-y-4">
                        <div className="flex flex-wrap justify-center gap-2">
                          {item.technologies?.slice(0, 4).map((tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs rounded-full border border-white/30"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="text-white text-sm font-medium flex items-center justify-center gap-2">
                          View Details <FaExternalLinkAlt className="w-3 h-3" />
                        </div>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <span className="px-4 py-1.5 bg-linear-to-r from-blue-500 to-purple-600 text-white text-xs font-bold rounded-full shadow-lg">
                        {item.category}
                      </span>
                      {item.featured && (
                        <span className="px-4 py-1.5 bg-yellow-500 text-gray-900 text-xs font-bold rounded-full shadow-lg">
                          ★ Featured
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-blue-500 text-sm font-semibold mb-1 uppercase tracking-wider">
                          {item.client}
                        </p>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 line-clamp-3">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-bold text-sm">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        {item.results}
                      </div>
                      <span className="text-blue-500 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Case Study <FaExternalLinkAlt className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
                {/* Bottom Gradient Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredPortfolio.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <FaSearch className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                No projects found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setSearchQuery("");
                }}
                className="mt-6 px-6 py-3 bg-linear-to-r from-blue-500 to-purple-600 text-white font-medium rounded-full hover:shadow-lg transition-all duration-300"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-linear-to-r from-blue-600 to-purple-700 py-20 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Let's discuss how we can help transform your business with our
            digital solutions.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Get Free Consultation
          </Link>
        </div>
      </section>
    </>
  );
};

export default Portfolio;