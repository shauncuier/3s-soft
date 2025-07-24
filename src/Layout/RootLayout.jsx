import React from "react";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import ScrollToTop from "../Components/ScrollToTop";
import { Toaster } from "react-hot-toast";

const RootLayout = () => {
  return (
    <>
      <Toaster position="top-right" />
      <ScrollToTop />
      <div>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default RootLayout;
