import React from "react";
import { FaHome } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router";

const Button = ({ label, to }) => {
  return (
    <Link
      to={to}
      className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-full hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 px-8 py-4 font-semibold flex items-center gap-2 transition duration-300 cursor-pointer text-lg"
    >
      {label === "Go Back Home" && <FaHome />}
      {label}
      {label === "Explore Our Services" && <FaArrowRightLong />}
    </Link>
  );
};

export default Button;
