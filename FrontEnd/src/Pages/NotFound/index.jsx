import React from 'react';
import { Link } from 'react-router-dom'; // If you are using react-router-dom

// Icons (You can use libraries like react-icons or create custom SVG)
import { FiAlertTriangle } from 'react-icons/fi'; // Example using react-icons

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 text-gray-800 p-4">
      <div className="text-center p-8 bg-white rounded-xl shadow-xl border border-gray-200 max-w-md w-full">
        <FiAlertTriangle className="text-6xl text-yellow-500 mx-auto mb-4 animate-bounce" />
        <h1 className="text-6xl font-extrabold text-gray-700 mb-2">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Page Not Found!</h2>
        <p className="text-lg text-gray-600 mb-8">
          Sorry, the page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          Please check the URL for any mistakes or return to the homepage.
        </p>
        <Link
          to="/" // Link to your homepage or desired route
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out transform hover:scale-105"
        >
          Go to Homepage
        </Link>
      </div>
      {/* You can add an engaging illustration or animation here */}
      {/* <img src="/path/to/your/not-found-image.svg" alt="Illustration" className="mt-8 w-64 h-64 object-contain"/> */}
    </div>
  );
};

export default NotFound;
