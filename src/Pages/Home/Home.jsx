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
        title="Scalable Digital Solutions for Global Success"
        content="3S-SOFT is a full-service digital agency providing expert MERN stack development, eCommerce managed services, SEO, and professional virtual assistants for US and UK businesses."
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
