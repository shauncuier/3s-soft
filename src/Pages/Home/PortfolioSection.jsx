import React, { useEffect, useState } from "react";
import SectionLabel from "../../Components/SectionLabel";
import { FaExternalLinkAlt, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

const PortfolioSection = () => {
    const [portfolio, setPortfolio] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState("All");
    const [filteredPortfolio, setFilteredPortfolio] = useState([]);

    useEffect(() => {
        import("../../data/portfolio.json").then((data) => {
            setPortfolio(data.portfolio || []);
            setCategories(data.categories || []);
            // Show only featured items initially
            const featured = (data.portfolio || []).filter((item) => item.featured);
            setFilteredPortfolio(featured.slice(0, 6));
        });
    }, []);

    useEffect(() => {
        if (activeCategory === "All") {
            const featured = portfolio.filter((item) => item.featured);
            setFilteredPortfolio(featured.slice(0, 6));
        } else {
            const filtered = portfolio.filter(
                (item) => item.category === activeCategory
            );
            setFilteredPortfolio(filtered.slice(0, 6));
        }
    }, [activeCategory, portfolio]);

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-20 px-5 transition-colors duration-300">
            <section className="max-w-[1480px] mx-auto">
                {/* Section Header */}
                <div className="flex flex-col items-center justify-center text-center mb-12">
                    <SectionLabel label="Our Portfolio" />
                    <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white">
                        Our Recent{" "}
                        <span className="bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                            Projects
                        </span>
                    </h2>
                    <p className="text-xl md:w-3/4 lg:w-1/2 mx-auto mt-5 text-gray-600 dark:text-gray-300">
                        Explore our portfolio of successful digital solutions delivered to
                        clients across the US, UK and beyond.
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.slice(0, 5).map((category, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 cursor-pointer ${activeCategory === category
                                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Portfolio Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPortfolio.map((item, index) => (
                        <div
                            key={item.id || index}
                            className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
                        >
                            <Link to={`/portfolio/${item.slug}`}>
                                {/* Image Container */}
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-5">
                                        <div className="flex gap-2">
                                            {item.technologies?.slice(0, 3).map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        <div
                                            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white hover:text-blue-600 transition-all duration-300"
                                        >
                                            <FaExternalLinkAlt className="w-4 h-4" />
                                        </div>
                                    </div>
                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="px-4 py-1.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-full shadow-lg">
                                            {item.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                                        {item.description}
                                    </p>

                                    {/* Client & Results */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider">
                                                Client
                                            </p>
                                            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                                {item.client}
                                            </p>
                                        </div>
                                        {item.results && (
                                            <div className="text-right">
                                                <p className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider">
                                                    Result
                                                </p>
                                                <p className="text-sm font-medium text-green-600 dark:text-green-400">
                                                    {item.results}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Link>

                            {/* Bottom Gradient Line */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="flex justify-center mt-12">
                    <Link
                        to="/portfolio"
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transform hover:-translate-y-1 transition-all duration-300"
                    >
                        View All Projects
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default PortfolioSection;
