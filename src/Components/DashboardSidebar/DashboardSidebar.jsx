import { useState } from "react";
import { GrLogout } from "react-icons/gr";
import { AiOutlineBars } from "react-icons/ai";
import { MdNoteAdd } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import logo from "../../assets/logo.jpg";

const DashboardSidebar = () => {
  const [isActive, setIsActive] = useState(true);

  const handleToggle = () => setIsActive(!isActive);

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="text-gray-100 bg-gray-800 flex justify-between md:hidden">
        <div className="block cursor-pointer p-4 font-bold">
          <Link to="/">
            <img src={""} alt="logo" className="w-14 h-14" />
          </Link>
        </div>
        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden text-gray-100 bg-gray-700 w-64 space-y-6 px-2 py-1 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        } md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <div>
          {/* Logo - Desktop */}
          <div className="w-full hidden md:flex justify-center items-center ">
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                className="w-14 h-14 rounded-full shadow-md shadow-blue-200"
              />
            </Link>
          </div>

          {/* Logo - Mobile */}
          <div className="block cursor-pointer p-4 font-bold bg-blue-100 md:hidden">
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                className="w-14 h-14 rounded-full mx-auto"
              />
            </Link>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav className="flex flex-col gap-4 px-2 py-5">
              <NavLink
                to="/dashboard"
                className={
                  "p-2 font-medium rounded-md border border-gray-400 flex items-center gap-2"
                }
              >
                <FaUserCircle />
                <span>Profile</span>
              </NavLink>
              <NavLink
                to="/dashboard/add-blog"
                className={({ isActive }) =>
                  `p-2 font-medium rounded-md border border-gray-400 flex items-center gap-2 ${
                    isActive &&
                    "bg-gradient-to-r from-blue-500 to-blue-700 text-white"
                  }`
                }
              >
                <MdNoteAdd />
                <span>Add Blog</span>
              </NavLink>
            </nav>
          </div>
        </div>

        {/* Logout Button */}
        <div>
          <hr className="text-gray-500" />
          <button className="flex w-full items-center px-4 py-2 mt-5 mb-3 bg-gradient-to-r from-red-700 to-red-600 transition-colors duration-300 transform cursor-pointer rounded-md">
            <GrLogout className="w-5 h-5" />
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
