import React from "react";
import Hero from "./Hero";
import FeaturesSection from "./FeaturesSection";
import ServicesSection from "./ServicesSection";
import PortfolioSection from "./PortfolioSection";
import WhyChooseUs from "./WhyChooseUs";
import Testimonials from "./Testimonials";
import PageTitle from "../../Components/PageTitle";

const Home = () => {
  return (
    <>
      <PageTitle
        title="Web Development, SEO, eCommerce & Virtual Assistant Services"
        content="3S-SOFT is a Bangladesh-based digital agency delivering MERN stack development, WordPress solutions, SEO services, eCommerce product listing, lead generation, graphic design, and virtual assistant support for global businesses."
      />
      <Hero />
      <ServicesSection />
      <PortfolioSection />
      <FeaturesSection />
      <Testimonials />
      <WhyChooseUs />
    </>
  );
};

export default Home;
