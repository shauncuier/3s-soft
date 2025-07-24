import React from "react";
import gif from "../../assets/rpa.gif";
import Button from "../../Components/Button";

const NotFound = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white px-6">
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="z-50 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-5 shadow-lg shadow-blue-400">
          <img src={gif} alt="Error Icon" className="w-20" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 ">
          404 - Page Not Found
        </h1>
        <p className="text-blue-200 text-center max-w-md mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Button label={"Go Back Home"} to={"/"} />
      </div>
    </section>
  );
};
export default NotFound;
