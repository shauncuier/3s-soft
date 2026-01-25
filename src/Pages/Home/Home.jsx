import React from "react";
import Hero from "./Hero";
import FeaturesSection from "./FeaturesSection";
import ServicesSection from "./ServicesSection";
import WhyChooseUs from "./WhyChooseUs";
import Testimonials from "./Testimonials";
import PageTitle from "../../Components/PageTitle";

const Home = () => {
  return (
    <>
      <PageTitle
        title="Home | Best Web Development & Digital Services in Bangladesh"
        content="3s-Soft is a full-service digital agency offering MERN stack development, WordPress customization, eCommerce product listing, SEO, and more."
      />
      <Hero />
      <ServicesSection />
      <FeaturesSection />
      <Testimonials />
      <WhyChooseUs />
    </>
  );
};

export default Home;
