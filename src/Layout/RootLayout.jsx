import React from "react";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import ScrollToTop from "../Components/ScrollToTop";
import { Toaster } from "react-hot-toast";
import StructuredData from "../Components/StructuredData";
import GoogleAnalytics from "../Components/GoogleAnalytics";

const RootLayout = () => {
  return (
    <>
      <Toaster position="top-right" />
      <GoogleAnalytics />
      <ScrollToTop />
      <StructuredData />
      <div>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default RootLayout;
