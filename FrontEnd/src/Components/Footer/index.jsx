import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'; // Example icons

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">

        {/* Copyright */}
        <div className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          © {new Date().getFullYear()} E-commerce. All rights reserved.
        </div>

        {/* Social Icons */}
        <div className="flex space-x-6">
          <a href="#" aria-label="Facebook" className="hover:text-blue-400 transition-colors duration-300">
            <FaFacebookF className="text-2xl" />
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-blue-400 transition-colors duration-300">
            <FaTwitter className="text-2xl" />
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-pink-500 transition-colors duration-300">
            <FaInstagram className="text-2xl" />
          </a>
          <a href="#" aria-label="LinkedIn" className="hover:text-blue-500 transition-colors duration-300">
            <FaLinkedinIn className="text-2xl" />
          </a>
        </div>

      </div>
    </footer>
  );
}
