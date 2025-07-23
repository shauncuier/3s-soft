import React from 'react';
import Hero from './Hero';
import FeaturesSection from './FeaturesSection';
import ServicesSection from './ServicesSection';

const Home = () => {
  return (
    <div className=''>
      <Hero />
      <ServicesSection />
      <FeaturesSection />
    </div>
  );
};

export default Home;