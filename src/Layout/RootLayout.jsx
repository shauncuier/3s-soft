import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';

const RootLayout = () => {
  return (
    <>
      <Navbar /> 
      <Outlet/>
      <Footer />
    </>
  );
};

export default RootLayout;