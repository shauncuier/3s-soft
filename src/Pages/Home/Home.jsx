import React from 'react';
import Hero from './Hero';
import FeaturesSection from './FeaturesSection';
import ServicesSection from './ServicesSection';
import WhyChooseUs from './WhyChooseUs';

const Home = () => {
  return (
    <div className=''>
      <Hero />
      <ServicesSection />
      <FeaturesSection />
      <WhyChooseUs />
    </div>
  );
};

export default Home;