import React from "react";
import { Link } from "react-router";
import { HiOutlineLightBulb, HiOutlineSparkles } from "react-icons/hi2";
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
import { LuHeartHandshake } from "react-icons/lu";
import SectionLabel from "../../Components/SectionLabel";
import Button from "../../Components/Button";
import PageTitle from "../../Components/PageTitle";
import aboutImage from "../../assets/about-us.webp";
import { withAutoLinks } from "../../utils/autoLinker";

const AboutUs = () => {
  const coreServices = [
    {
      icon: FaCode,
      title: "MERN Stack Web Development",
      gradient: "from-blue-500 to-purple-600",
    },
    {
      icon: FaWordpress,
      title: "WordPress Theme Customization",
      gradient: "from-green-500 to-teal-600",
    },
    {
      icon: FaShoppingCart,
      title: "Product Listing for eCommerce",
      gradient: "from-orange-500 to-red-600",
    },
    {
      icon: FaBullseye,
      title: "Lead Generation & Market Research",
      gradient: "from-purple-500 to-pink-600",
    },
    {
      icon: FaSearch,
      title: "Digital Marketing & SEO",
      gradient: "from-pink-500 to-rose-600",
    },
    {
      icon: FaFacebook,
      title: "Social Media Marketing",
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      icon: FaPaintBrush,
      title: "Graphic Design",
      gradient: "from-yellow-500 to-orange-600",
    },
    {
      icon: FaHeadphones,
      title: "Virtual Assistant Services",
      gradient: "from-indigo-500 to-purple-600",
    },
  ];
  return (
    <>
      <section className="bg-linear-to-b from-[#0f172a] to-[#1e293b] text-white px-4">
        <PageTitle
          title="About 3S-SOFT | Web Development, SEO & eCommerce Partner"
          content="Learn how 3S-SOFT helps startups, eCommerce brands, and service businesses grow with web development, SEO, marketplace support, design, and virtual assistant services."
          keywords={[
            "about 3S-SOFT",
            "digital agency Bangladesh",
            "web development company Bangladesh",
            "SEO agency Bangladesh",
            "eCommerce support company",
          ]}
        />
        <div className="max-w-370 min-h-screen mx-auto pt-24 sm:pt-28 md:pt-38 pb-20">
          {/* Header */}
          <div className="text-center">
            <SectionLabel label={"About 3S-SOFT"} />
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              3S-SOFT | Web Development, SEO & eCommerce Growth Partner
            </h1>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              {withAutoLinks(
                "3S-SOFT is a Bangladesh-based digital agency helping startups, " +
                "online stores, and service businesses build faster websites, " +
                "improve search visibility, and scale digital operations worldwide."
              )}
            </p>
          </div>

          {/* Who We Are */}
          <div className="grid md:grid-cols-2 gap-12 my-15">
            <div className="">
              <h3 className="text-3xl font-semibold mb-4">Who We Are</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                {withAutoLinks(
                  "3S-SOFT is a full-service digital agency based in Bangladesh, focused on " +
                  "helping businesses launch, grow, and optimize their online " +
                  "presence. We work across MERN stack development, WordPress " +
                  "customization, eCommerce product listing, SEO, lead generation, " +
                  "graphic design, social media marketing, and virtual assistant " +
                  "services."
                )}
              </p>
              <p className="text-gray-300 leading-relaxed">
                {withAutoLinks(
                  "Our team combines technical skill, marketing insight, " +
                  "and hands-on execution so clients can move faster and compete " +
                  "more effectively in local and global markets. Whether you need a robust " +
                  "web development solution, complete digital marketing overhaul, or a dedicated virtual assistant, " +
                  "we orchestrate everything you need to scale profitably."
                )}
              </p>
            </div>
            <img
              src={aboutImage}
              loading="lazy"
              alt="3S-SOFT Digital Agency - Expert MERN Stack & eCommerce Team in Bangladesh"
              className="rounded-2xl shadow-lg"
            />
          </div>

          {/* Our Approach Expansion */}
          <div className="mb-20">
            <h3 className="text-3xl font-semibold mb-6 text-center">Our Approach to Digital Excellence</h3>
            <div className="grid md:grid-cols-3 gap-8 text-gray-300 leading-relaxed">
              <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
                <h4 className="text-xl font-bold text-white mb-3">Modern Engineering</h4>
                <p>
                  {withAutoLinks(
                    "We specialize in high-performance web development utilizing the MERN stack " +
                    "to build scalable, interactive web applications. For content-focused brands, our " +
                    "WordPress experts craft custom themes optimized for extreme speed and intuitive user experiences."
                  )}
                </p>
              </div>
              <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
                <h4 className="text-xl font-bold text-white mb-3">Growth & Visibility</h4>
                <p>
                  {withAutoLinks(
                    "Building a site is only half the battle. Through aggressive digital marketing and " +
                    "data-driven SEO, we push your brand to the top of search results. Our targeted lead generation " +
                    "and dynamic social media strategies consistently convert targeted audiences into loyal customers."
                  )}
                </p>
              </div>
              <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
                <h4 className="text-xl font-bold text-white mb-3">E-Commerce Ecosystems</h4>
                <p>
                  {withAutoLinks(
                    "We dominate retail optimization. From Amazon storefronts to independent Shopify stores, our " +
                    "eCommerce experts handle every facet of product listing and conversion rate optimization, supported " +
                    "by talented graphic design to make your products impossible to ignore."
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div className="rounded-xl p-8 shadow-md shadow-gray-600 bg-black/30 border border-gray-700">
              <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiOutlineLightBulb className="text-4xl text-white" />
              </div>

              <h4 className="text-xl font-bold mb-2">Our Mission</h4>
              <p className="text-gray-300">
                {withAutoLinks(
                  "Our mission at 3S-SOFT is to empower brands and businesses to achieve sustainable " +
                  "growth through reliable, high-performance web development and strategic digital marketing. " +
                  "From custom MERN stack applications to advanced SEO and Amazon eCommerce integrations, " +
                  "we deliver end-to-end digital execution that produces measurable, pipeline-driving results."
                )}
              </p>
            </div>
            <div className="rounded-xl p-8 shadow-md shadow-gray-600 bg-black/30 border border-gray-700">
              <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiOutlineSparkles className="text-4xl text-white" />
              </div>

              <h4 className="text-xl font-bold mb-2">Our Vision</h4>
              <p className="text-gray-300">
                {withAutoLinks(
                  "Our vision is to become the leading long-term digital partner for global organizations " +
                  "requiring scalable websites, dominant search visibility, and streamlined online operations. " +
                  "By combining expert WordPress customization, proactive lead generation, striking graphic design, " +
                  "and dedicated virtual assistant teams, we aim to eliminate the complexities of the digital landscape."
                )}
              </p>
            </div>
          </div>

          {/* Core Services */}
          <div className="text-center mb-20">
            <h3 className="text-3xl font-semibold">What We Offer</h3>
            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-10">
              {coreServices.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <Link key={index} to={"/services"}>
                    <div className="group bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-700 overflow-hidden relative">
                      {/* Icon Header */}
                      <div className="p-6 pb-0 flex flex-col items-center">
                        <div
                          className={`w-16 h-16 rounded-2xl bg-linear-to-r ${service.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                        >
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>

                        <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                          {service.title}
                        </h3>
                      </div>

                      {/* Hover Effect Overlay */}
                      <div
                        className={`absolute inset-x-0 bottom-0 h-1 bg-linear-to-r ${service.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
                      ></div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="flex flex-col items-center justify-center rounded-xl p-8 shadow-md shadow-gray-600 bg-black/30 border border-gray-700">
            <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
              <LuHeartHandshake className="text-4xl text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">
              Why Clients Trust 3s-Soft?
            </h3>
            <p className="text-gray-300 max-w-3xl mx-auto text-center">
              {withAutoLinks(
                "Clients trust us for practical strategy, clear communication, " +
                "reliable execution, and measurable business value across web " +
                "development, SEO, eCommerce operations, and virtual assistant support."
              )}
            </p>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-10 flex flex-col items-center justify-center">
            <h4 className="text-xl md:text-2xl font-semibold mb-2">
              Let’s build something great together
            </h4>
            <p className="text-gray-400 mb-4">
              Tell us about your project and we'll make it happen.
            </p>
            <div className="">
              <Button label={"Contact Us"} to={"/contact"} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
