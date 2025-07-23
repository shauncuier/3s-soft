import React from "react";
import { Link } from "react-router"; // Optional if using routing

const CallToAction = () => (
  <div className="text-center">
    <h4 className="text-xl md:text-2xl font-semibold mb-2">Ready to level up your business?</h4>
    <p className="text-gray-400 mb-4">Let’s build something amazing together.</p>
    <Link to="/contact">
      <button className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/80 transition">
        Contact Us
      </button>
    </Link>
  </div>
);

export default CallToAction;
