import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-green-600 p-4 text-white flex justify-between items-center">
      <div className="flex items-center space-x-4"> 
      <h1 className="text-xl font-bold">Serenaid</h1>
      <ul className="flex space-x-6">
        <li><Link to="/" className="block px-4 py-2 rounded hover:bg-gray-800 hover:shadow-lg hover:text-green-400 hover:underline">Home</Link></li>
        <li><Link to="/about" className="block px-4 py-2 rounded hover:bg-gray-800 hover:shadow-lg hover:text-green-400 hover:underline">About</Link></li>
        <li><Link to="/contacts" className="block px-4 py-2 rounded hover:bg-gray-800 hover:shadow-lg hover:text-green-400 hover:underline">Contact</Link></li>
      </ul>
      </div>
      <ul className="flex space-x-6">
        <li><Link to="/" className="block px-4 py-2 rounded hover:bg-gray-800 hover:shadow-lg hover:text-green-400 hover:underline">Login</Link></li>
        <li><Link to="/about" className="block px-4 py-2 rounded hover:bg-gray-800 hover:shadow-lg hover:text-green-400 hover:underline">Signup</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
