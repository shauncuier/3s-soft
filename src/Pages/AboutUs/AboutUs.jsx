import React from "react";
import { HiOutlineLightBulb, HiOutlineBriefcase, HiOutlineSparkles } from "react-icons/hi2";
import { Link } from "react-router";

const AboutUs = () => {
  return (
    <section className="bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Get to Know <span className="text-primary">3s-Soft</span>
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            We build scalable, stunning, and strategic web solutions to elevate your business digitally.
          </p>
        </div>

        {/* Who We Are */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Who We Are</h3>
            <p className="text-gray-300 leading-relaxed">
              <strong>3s-Soft</strong> is a full-service digital agency based in Bangladesh. We specialize in MERN stack web development, WordPress customization, and eCommerce listing services for platforms like Amazon, eBay, Etsy, and Walmart. With a team of experienced developers, designers, and marketers, we help businesses grow online.
            </p>
          </div>
          <img
            src="https://source.unsplash.com/600x400/?technology,teamwork"
            alt="About 3s-Soft"
            className="rounded-2xl shadow-lg"
          />
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-base-100 rounded-xl p-8 shadow-lg">
            <HiOutlineLightBulb className="text-4xl text-primary mb-3" />
            <h4 className="text-xl font-bold mb-2">Our Mission</h4>
            <p className="text-gray-300">
              To empower businesses with powerful and user-centric digital solutions that drive measurable results.
            </p>
          </div>
          <div className="bg-base-100 rounded-xl p-8 shadow-lg">
            <HiOutlineSparkles className="text-4xl text-primary mb-3" />
            <h4 className="text-xl font-bold mb-2">Our Vision</h4>
            <p className="text-gray-300">
              To be a global leader in web development, eCommerce services, and virtual support through constant innovation.
            </p>
          </div>
        </div>

        {/* Core Services */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-6">What We Offer</h3>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              "MERN Stack Web Development",
              "WordPress Theme Customization",
              "Amazon/eBay/Walmart/Etsy Product Listings",
              "Graphics Design & Branding",
              "Lead Generation & Market Research",
              "Virtual Assistant Services",
            ].map((service, i) => (
              <div key={i} className="bg-base-100 rounded-xl p-6 shadow hover:shadow-xl transition">
                <HiOutlineBriefcase className="text-3xl text-primary mb-4" />
                <h5 className="text-lg font-semibold text-white">{service}</h5>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-base-100 rounded-xl p-10 shadow-lg text-center">
          <h3 className="text-2xl font-bold mb-4">Why Clients Trust 3s-Soft?</h3>
          <p className="text-gray-300 max-w-3xl mx-auto">
            We're committed to delivering quality, speed, and long-term value. Our solutions are not just functional — they're designed to make your business thrive in the digital world.
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-10">
          <h4 className="text-xl md:text-2xl font-semibold mb-2">Let’s build something great together</h4>
          <p className="text-gray-400 mb-4">Tell us about your project and we'll make it happen.</p>
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
