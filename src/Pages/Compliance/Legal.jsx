import React from 'react';
import PageTitle from "../../Components/PageTitle";

const Compliance = () => {
  return (
    <div className='max-w-370 min-h-screen mx-auto pt-24 sm:pt-28 md:pt-38 xl:pt-44 px-4'>
      <PageTitle
        title="Cookie Policy | 3s-Soft Legal Information"
        content="Learn about how 3s-Soft uses cookies to improve your browsing experience and provide tailored digital services."
      />
      <h1 className="text-3xl font-bold text-white mb-6">Cookie Policy</h1>
      <div className="text-gray-300 space-y-4">
        <p>This Cookie Policy explains how 3S-SOFT uses cookies and similar technologies to recognize you when you visit our website.</p>
        {/* Add more legal text as needed */}
      </div>
    </div>
  );
};

export default Compliance;