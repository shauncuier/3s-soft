import React from "react";
import { Link, NavLink } from "react-router";
import { FiMenu } from "react-icons/fi";
import logo from "../assets/logo.jpg";
import ProgressBar from "./ProgressBar";

const Navbar = () => {
  const links = <>
    <li>
      <NavLink to={'/'} className={({ isActive }) => `font-medium ${isActive && 'text-blue-400'} hover:text-blue-400 transition-all duration-300`}>Home</NavLink>
    </li>
    <li>
      <NavLink to={'/services'} className={({ isActive }) => `font-medium ${isActive && 'text-blue-400'} hover:text-blue-400 transition-all duration-300`}>Services</NavLink>
    </li>
    <li>
      <NavLink to={'/team'} className={({ isActive }) => `font-medium ${isActive && 'text-blue-400'} hover:text-blue-400 transition-all duration-300`}>Team</NavLink>
    </li>
    <li>
      <NavLink to={'/blogs'} className={({ isActive }) => `font-medium ${isActive && 'text-blue-400'} hover:text-blue-400 transition-all duration-300`}>Blogs</NavLink>
    </li>
    <li>
      <NavLink to={'/about-us'} className={({ isActive }) => `font-medium ${isActive && 'text-blue-400'} hover:text-blue-400 transition-all duration-300`}>About Us</NavLink>
    </li>
    <li>
      <NavLink to={'/contact'} className={({ isActive }) => `font-medium ${isActive && 'text-blue-400'} hover:text-blue-400 transition-all duration-300`}>Contact Us</NavLink>
    </li>
    <li>
      <NavLink to={'/dashboard'} className={({ isActive }) => `font-medium ${isActive && 'text-blue-400'} hover:text-blue-400 transition-all duration-300`}>Dashboard</NavLink>
    </li>
  </>
  return (
    <div className="bg-black/30 backdrop-blur-2xl fixed top-0 w-full z-50 py-2">
      <nav className="navbar max-w-[1480px] mx-auto px-5">
        <div className="navbar-start gap-4">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="lg:hidden">
              <FiMenu size={25} />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-4 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to="/" className="text-2xl font-bold flex items-center">
            <img src={logo} alt="Navbar Logo" className="w-10 md:w-12 rounded-full" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-8">
            {links}
          </ul>
        </div>
        <div className="navbar-end">
          {/* <Button label={"Contact Us"} to={'/contact'} /> */}
          <Link to={'/contact'} className="text-sm font-medium py-2 px-5 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full hover:from-blue-700 hover:to-blue-800 transition duration-300 transform hover:scale-105 ">Get Started</Link>
        </div>
      </nav>
      <ProgressBar />
    </div>
  );
};

export default Navbar;
