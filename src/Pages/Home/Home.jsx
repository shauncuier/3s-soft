import React from 'react';
import Hero from './Hero';
import FeaturesSection from './FeaturesSection';
import ServicesSection from './ServicesSection';
import WhyChooseUs from './WhyChooseUs';
import Testimonials from './Testimonials';

const Home = () => {
  return (
    <div className=''>
      <Hero />
      <ServicesSection />
      <FeaturesSection />
      <Testimonials />
      <WhyChooseUs />
    </div>
  );
};

export default Home;