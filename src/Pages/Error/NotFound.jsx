import React from "react";
import { useNavigate } from "react-router";
import { HiOutlineEmojiSad } from "react-icons/hi";
import { FaHome } from "react-icons/fa";

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white px-6">
            <HiOutlineEmojiSad size={80} className="text-yellow-400 mb-6 animate-pulse" />
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="text-blue-200 text-center max-w-md mb-8">
                Oops! The page you're looking for doesn't exist or has been moved.
            </p>
            <button
                onClick={() => navigate("/")}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full font-semibold transition"
            >
                <FaHome />  Go Back Home
            </button>
        </section>
    );
};
export default NotFound;
