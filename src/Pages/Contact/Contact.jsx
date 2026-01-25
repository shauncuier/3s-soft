import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import { MdOutlineEmail, MdWhatsapp } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { FiPhone, FiSend } from "react-icons/fi";
import { LuMapPin, LuGlobe } from "react-icons/lu";
import SectionLabel from "../../Components/SectionLabel";
import PageTitle from "../../Components/PageTitle";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formRef = useRef();

  const services = [
    "Web Development (MERN Stack)",
    "WordPress Customization",
    "Product Listing for eCommerce",
    "Lead Generation",
    "Digital Marketing & SEO",
    "Social Media Marketing",
    "Graphic Design",
    "Virtual Assistant Services",
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setIsSubmitting(false);
      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
      }, 3000);
    } catch (error) {
      console.error("EmailJS Error:", error.text);
      setIsSubmitting(false);
      alert("Something went wrong. Please try again later.");
    }
  };
  return (
    <>
      <section className="bg-gradient-to-br from-black via-gray-900 to-purple-900 relative overflow-hidden px-4">
        <PageTitle
          title="Contact Us | Start Your Project with 3s-Soft"
          content="Get a free quote for your next digital project. Reach out to 3s-Soft for web development, SEO, and eCommerce services."
        />
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-48 h-48 bg-purple-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-orange-400/10 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 max-w-[1480px] min-h-screen mx-auto pt-24 sm:pt-28 md:pt-38 pb-20">
          {/* Section Header */}
          <div className="text-center mb-16">
            <SectionLabel label={"Let's Grow Together"} />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Start Your Project?
            </h1>
            <p className="text-lg md:text-xl text-blue-200 max-w-3xl mx-auto">
              Whether you're looking to build a website, launch a product, grow
              on social media, or scale your operations — 3S-SOFT is the partner
              you can trust.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  Get in Touch
                </h3>
                <p className="text-blue-300 mb-8">
                  Ready to transform your digital presence? Let's discuss your
                  project and discover how we can help you achieve your goals.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <MdOutlineEmail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Email Us</div>
                    <div className="text-blue-200">info@3s-soft.com</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
                    <FiPhone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Call Us</div>
                    <div className="text-blue-200">+880 1835 927634</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                    <LuMapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Visit Us</div>
                    <div className="text-blue-200">Chittagong, Bangladesh</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                    <LuGlobe className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Website</div>
                    <div className="text-blue-200">www.3s-soft.com</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center text-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <div className="space-y-3.5">
                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700">
                    WhatsApp
                  </h3>
                  <p className="text-lg w-3/4 mx-auto">
                    We are always active in whatsapp, let's talk and create
                    something new!!
                  </p>

                  <a
                    href="https://wa.me/8801835927634"
                    className="inline-flex items-center gap-1 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    <MdWhatsapp className="h-6 w-6 text-white" />
                    Whatsapp
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              {!isSubmitted ? (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Send Us a Message
                  </h3>
                  <p className="text-blue-200">
                    Fill out the form below and we'll get back to you within 24
                    hours.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-white font-medium mb-2 block">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
                      />
                    </div>

                    <div>
                      <label className="text-white font-medium mb-2 block">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Your phone number"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-white font-medium mb-2 block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
                    />
                  </div>

                  <div>
                    <label className="text-white font-medium mb-2 block">
                      Service Interested In
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
                    >
                      <option value="">Select a service</option>
                      {services.map((service, idx) => (
                        <option
                          key={idx}
                          value={service}
                          className="text-gray-800"
                        >
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-white font-medium mb-2 block">
                      Project Details
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us about your project..."
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 cursor-pointer transition-all duration-300 transform hover:scale-105"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <FiSend className="h-5 w-5" />
                        <span>Get Free Quote</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaRegCheckCircle className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-blue-200 mb-6">
                    Thank you for reaching out. We'll review your request and
                    get back to you soon.
                  </p>
                  <div className="text-blue-300 text-sm">
                    Redirecting to form...
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="bg-white/3 backdrop-blur-sm rounded-3xl p-8 border border-white/5">
              <h3 className="text-2xl font-bold text-white mb-4">
                Let's Build Your Digital Future — Today
              </h3>
              <p className="text-blue-300 mb-6">
                Ready to take your business to the next level? We're here to
                help you succeed.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <a
                  href="mailto:info@3s-soft.com"
                  className="inline-flex items-center bg-white text-blue-600 hover:bg-gray-50 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  <MdOutlineEmail className="h-5 w-5 mr-2" />
                  Email Us
                </a>
                <a
                  href="tel:+8801835927634"
                  className="inline-flex items-center bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  <FiPhone className="h-5 w-5 mr-2" />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
