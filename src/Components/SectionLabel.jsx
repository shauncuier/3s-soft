import React from "react";

const SectionLabel = ({ label }) => {
  return (
    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full px-4 py-2 mb-6">
      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-sm font-medium">
        {label}
      </span>
    </div>
  );
};

export default SectionLabel;
