import React from "react";
import {
  FaCode,
  FaWordpress,
  FaShoppingCart,
  FaBullseye,
  FaSearch,
  FaFacebook,
  FaPaintBrush,
  FaHeadphones,
} from "react-icons/fa";
import SectionLabel from "../../Components/SectionLabel";
import Button from "../../Components/Button";

const Services = () => {
  const services = [
    {
      icon: FaCode,
      title: "Web Development (MERN Stack)",
      description:
        "Full-stack custom web apps, dashboards, and dynamic websites built with MongoDB, Express, React, and Node.js.",
      gradient: "from-blue-500 to-purple-600",
      features: [
        "Custom Web Applications",
        "Dynamic Dashboards",
        "API Integration",
        "Database Design",
      ],
    },
    {
      icon: FaWordpress,
      title: "WordPress Customization",
      description:
        "Fast, secure, SEO-optimized WordPress sites tailored to your brand and goals.",
      gradient: "from-green-500 to-teal-600",
      features: [
        "Custom Themes",
        "Plugin Development",
        "SEO Optimization",
        "Performance Enhancement",
      ],
    },
    {
      icon: FaShoppingCart,
      title: "Product Listing for eCommerce",
      description:
        "Bulk or individual product uploads for Amazon, eBay, Etsy, Walmart, and more — with keyword optimization.",
      gradient: "from-orange-500 to-red-600",
      features: [
        "Amazon Listing",
        "eBay Integration",
        "Keyword Optimization",
        "Image Processing",
      ],
    },
    {
      icon: FaBullseye,
      title: "Lead Generation",
      description:
        "High-quality B2B/B2C leads for your niche through modern tools and proven methods.",
      gradient: "from-purple-500 to-pink-600",
      features: [
        "B2B Lead Generation",
        "B2C Campaigns",
        "Data Analytics",
        "CRM Integration",
      ],
    },
    {
      icon: FaSearch,
      title: "Digital Marketing & SEO",
      description:
        "Drive traffic and sales with our result-oriented SEO, local SEO, and search engine optimization strategies.",
      gradient: "from-cyan-500 to-blue-600",
      features: [
        "SEO Optimization",
        "Local SEO",
        "Content Marketing",
        "Analytics Tracking",
      ],
    },
    {
      icon: FaFacebook,
      title: "Social Media Marketing",
      description:
        "Boost visibility and engagement with tailored campaigns on Facebook, Instagram, LinkedIn, and other platforms.",
      gradient: "from-pink-500 to-rose-600",
      features: [
        "Content Creation",
        "Campaign Management",
        "Audience Targeting",
        "Performance Metrics",
      ],
    },
    {
      icon: FaPaintBrush,
      title: "Graphic Design",
      description:
        "Professional logos, banners, social media creatives, print design, and more.",
      gradient: "from-yellow-500 to-orange-600",
      features: [
        "Logo Design",
        "Brand Identity",
        "Print Design",
        "Digital Creatives",
      ],
    },
    {
      icon: FaHeadphones,
      title: "Virtual Assistant Services",
      description:
        "Reliable support for tasks like data entry, email management, research, product uploads, and CRM updates.",
      gradient: "from-indigo-500 to-purple-600",
      features: [
        "Data Entry",
        "Email Management",
        "Research Tasks",
        "Administrative Support",
      ],
    },
  ];

  return (

    <section
      className="bg-gray-900 transition-colors duration-300 px-4"
    >
      <div className="max-w-[1480px] min-h-screen mx-auto pt-24 sm:pt-28 md:pt-38 pb-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          <SectionLabel label={"Our Core Services"} />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            High-Quality Digital Solutions
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            We provide scalable digital solutions tailored for startups, small
            businesses, and enterprises across multiple industries.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="group bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-700 overflow-hidden relative"
              >
                {/* Icon Header */}
                <div className="p-6 pb-0">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="text-gray-300 leading-relaxed mb-4">
                    {service.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="p-6 pt-0">
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-sm text-gray-400"
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient} mr-2`}
                        ></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hover Effect Overlay */}
                <div
                  className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${service.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
                ></div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="flex items-center justify-center mt-16">
          <Button label={"Start Your Project Today"} to={"/contact"} />
        </div>
      </div>
    </section>
  );
};

export default Services;
