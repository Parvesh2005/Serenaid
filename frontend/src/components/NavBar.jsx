import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-primary text-primary-content">
      <div className="flex-1">
        <Link to="/" className="text-xl font-bold mr-6 hover:text-green-300 px-4">
          Serenaid
        </Link>
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/" className="btn btn-ghost">Home</Link>
          </li>
          <li>
            <Link to="/about" className="btn btn-ghost">About Us</Link>
          </li>
          <li>
            <Link to="/contacts" className="btn btn-ghost">Contact Us</Link>
          </li>
        </ul>
      </div>

      <div className="flex gap-4 px-4">
        <Link to="/login" className="btn btm-nav-label btn-neutral">
          Login
        </Link>
        <Link to="/signup" className="btn btm-nav-label btn-neutral">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

// OLD NAVBAR

// import React from "react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <nav className="bg-green-600 p-4 text-white flex justify-between items-center">
//       <div className="flex items-center space-x-4">
//         <h1 className="text-xl font-bold">Serenaid</h1>
//         <ul className="flex space-x-6">
//           <li className="rounded transform hover:scale-105 hover:bg-gray-800 hover:shadow-lg hover:text-green-400 hover:underline transition duration-200">
//             <Link to="/" className="block px-4 py-2 w-full h-full">
//               Home
//             </Link>
//           </li>
//           <li className="rounded transform hover:scale-105 hover:bg-gray-800 hover:shadow-lg hover:text-green-400 hover:underline transition duration-200">
//             <Link to="/about" className="block px-4 py-2 w-full h-full">
//               About
//             </Link>
//           </li>
//           <li className="rounded transform hover:scale-105 hover:bg-gray-800 hover:shadow-lg hover:text-green-400 hover:underline transition duration-200">
//             <Link to="/contacts" className="block px-4 py-2 w-full h-full">
//               Contact
//             </Link>
//           </li>
//         </ul>
//       </div>
//       <ul className="flex space-x-6">
//         <li className="rounded transform hover:scale-105 hover:bg-gray-800 hover:shadow-lg hover:text-green-400 hover:underline transition duration-200">
//           <Link to="/" className="block px-4 py-2 w-full h-full">
//             Login
//           </Link>
//         </li>
//         <li className="rounded transform hover:scale-105 hover:bg-gray-800 hover:shadow-lg hover:text-green-400 hover:underline transition duration-200">
//           <Link to="/about" className="block px-4 py-2 w-full h-full">
//             Signup
//           </Link>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;