import React from "react";
import {
  HiOutlineLightBulb,
  HiOutlineBriefcase,
  HiOutlineSparkles,
} from "react-icons/hi2";
import { Link } from "react-router";
import SectionLabel from "../../Components/SectionLabel";
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
import aboutImage from "../../assets/about-us.jpg";

const AboutUs = () => {
  // "",
  //             "",
  //             "",
  //             "Graphics Design & Branding",
  //             "",
  //             "Virtual Assistant Services",
  const coreServices = [
    {
      icon: FaCode,
      title: "MERN Stack Web Development",
    },
    {
      icon: FaWordpress,
      title: "WordPress Theme Customization",
    },
    {
      icon: FaShoppingCart,
      title: "Product Listing for eCommerce",
    },
    {
      icon: FaBullseye,
      title: "Lead Generation & Market Research",
    },
    {
      icon: FaSearch,
      title: "Digital Marketing & SEO",
    },
    {
      icon: FaFacebook,
      title: "Social Media Marketing",
    },
    {
      icon: FaPaintBrush,
      title: "Graphic Design",
    },
    {
      icon: FaHeadphones,
      title: "Virtual Assistant Services",
    },
  ];
  return (
    <section className="bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white">
      <div className="max-w-[1480px] min-h-screen mx-auto pt-24 sm:pt-28 md:pt-38 pb-20">
        {/* Header */}
        <div className="text-center">
          <SectionLabel label={"About 3s-soft"} />
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Who We Are
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            We're a passionate team of creators and developers dedicated to
            building impactful digital solutions that inspire, solve problems,
            and make the web a better place.
          </p>
        </div>

        {/* Who We Are */}
        <div className="grid md:grid-cols-2 gap-12 my-15">
          <div className="">
            <h3 className="text-2xl font-semibold mb-4">About 3s-soft</h3>
            <p className="text-gray-300 leading-relaxed">
              <strong className="text-blue-400">3s-Soft</strong> is a
              full-service digital agency proudly based in Bangladesh, committed
              to delivering top-notch web and digital solutions. We specialize
              in modern MERN stack web development, WordPress customization, and
              comprehensive eCommerce listing services for platforms like
              Amazon, eBay, Etsy, and Walmart. With a dedicated team of
              experienced developers, creative designers, and strategic
              marketers, we work hand-in-hand with businesses to build engaging
              websites, streamline operations, and maximize online visibility.
              Whether you're launching a startup or scaling an existing
              business, 3s-Soft is here to help you grow and thrive in the
              digital space.
            </p>
          </div>
          <img
            src={aboutImage}
            alt="About 3s-Soft"
            className="rounded-2xl shadow-lg"
          />
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-15">
          <div className="bg-base-100 rounded-xl p-8 shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <HiOutlineLightBulb className="text-4xl text-white" />
            </div>

            <h4 className="text-xl font-bold mb-2">Our Mission</h4>
            <p className="text-gray-300">
              To empower businesses with powerful and user-centric digital
              solutions that drive measurable results.
            </p>
          </div>
          <div className="bg-base-100 rounded-xl p-8 shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <HiOutlineSparkles className="text-4xl text-white" />
            </div>

            <h4 className="text-xl font-bold mb-2">Our Vision</h4>
            <p className="text-gray-300">
              To be a global leader in web development, eCommerce services, and
              virtual support through constant innovation.
            </p>
          </div>
        </div>

        {/* Core Services */}
        <div className="text-center mb-15">
          <h3 className="text-2xl font-semibold mb-6">What We Offer</h3>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {coreServices.map((service, i) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={i}
                  className="bg-base-100 rounded-xl p-6 shadow hover:shadow-xl transition flex items-center gap-3"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="text-3xl text-white" />
                  </div>

                  <h5 className="text-lg font-semibold text-white">
                    {service.title}
                  </h5>
                </div>
              );
            })}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-base-100 rounded-xl p-10 shadow-lg text-center ">
          <h3 className="text-2xl font-bold mb-4">
            Why Clients Trust 3s-Soft?
          </h3>
          <p className="text-gray-300 max-w-3xl mx-auto">
            We're committed to delivering quality, speed, and long-term value.
            Our solutions are not just functional — they're designed to make
            your business thrive in the digital world.
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-10">
          <h4 className="text-xl md:text-2xl font-semibold mb-2">
            Let’s build something great together
          </h4>
          <p className="text-gray-400 mb-4">
            Tell us about your project and we'll make it happen.
          </p>
          <Link to="/contact">
            <button className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/80 transition">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
