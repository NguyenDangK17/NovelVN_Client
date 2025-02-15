import React from "react";

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-9xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-4">
        Oops! The page you're looking for doesn't exist.
      </p>
      <button
        onClick={() => (window.location.href = "/")}
        className="mt-6 px-6 py-3 text-lg font-medium text-white bg-[#ff5722] rounded-lg hover:bg-gray-900 transition-all"
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFoundPage;
