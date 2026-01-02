// File: components/LoadingSpinner.jsx
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 z-50">
      <div className="w-16 h-16 border-4 border-t-blue-500 border-b-blue-500 border-gray-200 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
