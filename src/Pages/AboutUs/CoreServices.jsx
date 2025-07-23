import React from "react";

const services = [
  "MERN Stack Web Development",
  "WordPress Customization",
  "Amazon/eBay/Walmart/Etsy Product Listings",
  "Graphics Design & Branding",
  "Lead Generation & Virtual Assistant Services"
];

const CoreServices = () => (
  <div>
    <h3 className="text-2xl font-semibold mb-4 text-center">Our Core Services</h3>
    <ul className="grid sm:grid-cols-2 gap-3 text-gray-300 list-disc list-inside">
      {services.map((service, index) => (
        <li key={index}>{service}</li>
      ))}
    </ul>
  </div>
);

export default CoreServices;
