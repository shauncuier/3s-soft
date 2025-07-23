import React from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router";

const Button = ({ label, to }) => {
  return (
    <Link to={to}>
      <button className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-full hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 px-6 py-3 font-semibold flex items-center gap-2 transition duration-300 cursor-pointer">
        {label === "Go Back Home" && <FaHome></FaHome>}
        {label}
      </button>
    </Link>
  );
};

export default Button;
