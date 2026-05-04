import React from 'react';

export default function About() {
  return (
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      {/* Subtle background gradient or pattern */}
      <div className="absolute inset-0 z-0 opacity-20">
        <svg className="h-full w-full" viewBox="0 0 1600 1600" aria-hidden="true">
          <g fill="url(#cc0d970b-dc06-4098-a871-5739c24f466a)" fill-rule="evenodd">
            <path d="M0 1109.483h1600V1299H0v-189.517zM0 763.583h1600V953.1h0V953.1H0v-189.517zM0 417.683h1600V607.2h0V607.2H0V417.683z"/>
          </g>
          <defs>
            <pattern id="cc0d970b-dc06-4098-a871-5739c24f466a" x="0" y="0" width="320" height="320" patternUnits="userSpaceOnUse">
              <path d="M0 320C176.732 320 320 176.732 320 0h-320v320z" fill="#4C51BF"/>
            </pattern>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent mb-6 drop-shadow animate-fadeIn">
          About Our Vision
        </h1>
        <p className="text-xl text-gray-700 leading-relaxed mb-12">
          Welcome to our e-commerce platform, a curated space where <strong className="text-indigo-600 font-semibold">quality</strong> meets unparalleled <strong className="text-indigo-600 font-semibold">convenience</strong>. We are dedicated to bringing you exceptional products with a seamless shopping experience.
        </p>
        {/* Optional: Add a button or more content here */}
        <a
          href="#learn-more" // Replace with actual link or anchor
          className="inline-block px-8 py-4 border-2 border-indigo-600 text-lg font-semibold rounded-lg text-indigo-700 hover:bg-indigo-600 hover:text-white transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Our Mission
        </a>
      </div>
    </div>
  );
}
