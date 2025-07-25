import React from "react";

const SectionLabel = ({ label }) => {
  return (
    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-full px-4 py-2 mb-6">
      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 text-sm font-medium">
        {label}
      </span>
    </div>
  );
};

export default SectionLabel;
