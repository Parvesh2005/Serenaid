import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-green-600 p-4 text-white flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold">Serenaid</h1>
        <ul className="flex space-x-6">
          <li className="rounded transform hover:scale-105 hover:bg-gray-800 hover:shadow-lg hover:text-green-400 hover:underline transition duration-200">
            <Link to="/" className="block px-4 py-2 w-full h-full">
              Home
            </Link>
          </li>
          <li className="rounded transform hover:scale-105 hover:bg-gray-800 hover:shadow-lg hover:text-green-400 hover:underline transition duration-200">
            <Link to="/about" className="block px-4 py-2 w-full h-full">
              About
            </Link>
          </li>
          <li className="rounded transform hover:scale-105 hover:bg-gray-800 hover:shadow-lg hover:text-green-400 hover:underline transition duration-200">
            <Link to="/contacts" className="block px-4 py-2 w-full h-full">
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <ul className="flex space-x-6">
        <li className="rounded transform hover:scale-105 hover:bg-gray-800 hover:shadow-lg hover:text-green-400 hover:underline transition duration-200">
          <Link to="/" className="block px-4 py-2 w-full h-full">
            Login
          </Link>
        </li>
        <li className="rounded transform hover:scale-105 hover:bg-gray-800 hover:shadow-lg hover:text-green-400 hover:underline transition duration-200">
          <Link to="/about" className="block px-4 py-2 w-full h-full">
            Signup
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;