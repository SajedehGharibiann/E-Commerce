import React from "react";
import { CiLogin, CiShoppingCart, CiUser } from "react-icons/ci";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const cartLength = useSelector((state) => state.cart.items).length;
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <nav className="w-full sticky top-0 z-50 bg-white/70 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] border-b border-white/40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link 
          to="/" 
          className="text-3xl font-black tracking-tight bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent drop-shadow-sm hover:opacity-90 transition-all duration-300"
        >
          E-commerce
        </Link>

        <ul className="hidden md:flex items-center gap-10 text-gray-700 font-semibold tracking-wide">
          <li className="relative group cursor-pointer">
            <Link to="/about" className="hover:text-blue-600 transition-all">About</Link>
            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-blue-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
          </li>
          <li className="relative group cursor-pointer">
            <Link to="/contact" className="hover:text-blue-600 transition-all">Contact</Link>
            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-blue-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
          </li>
          <li className="relative group cursor-pointer">
            <Link to="/products/all/all-category" className="hover:text-blue-600 transition-all">Products</Link>
            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-blue-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
          </li>
        </ul>

        <div className="flex items-center gap-6">

          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded-full py-2 pl-4 pr-10 text-sm w-72 bg-white/80 shadow-md backdrop-blur-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
          </div>

          <button
            className="relative text-3xl text-gray-700 hover:text-indigo-600 transition-transform duration-300 hover:scale-110"
            onClick={() => navigate("/cart")}
          >
            <CiShoppingCart />
            {cartLength>0 && 
              <span className="absolute -top-2 -right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full text-xs px-2 py-0.5 shadow-lg animate-bounce">
                {cartLength}
              </span>
            }
          </button>

          {token ? 
            <button
              onClick={() => navigate("/profile")}
              className="text-3xl text-gray-700 hover:text-indigo-600 transition-transform duration-300 hover:scale-110"
            >
              <CiUser />
            </button>
           : 
            <button
              onClick={() => navigate("/auth")}
              className="text-3xl text-gray-700 hover:text-indigo-600 transition-transform duration-300 hover:scale-110"
            >
              <CiLogin />
            </button>
          }
        </div>
      </div>

      <div className="md:hidden px-5 pb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded-full py-2 pl-4 pr-10 text-sm w-full bg-white/80 shadow-md transition focus:ring-2 focus:ring-blue-600 outline-none"
        />
      </div>
    </nav>
  );
}
