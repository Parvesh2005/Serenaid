import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContex";

const Navbar = () => {
  const { session, signOut } = UserAuth();

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

          {session && <Link to="/dashboard" className="btn btn-ghost">Dashboard</Link>}

          <li>
            <Link to="/about" className="btn btn-ghost">About Us</Link>
          </li>
          <li>
            <Link to="/contacts" className="btn btn-ghost">Contact Us</Link>
          </li>
        </ul>
      </div>

      <div className="flex gap-4 px-4">
        {
          session ? 
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] w-52 p-2 shadow bg-base-100 text-neutral-content rounded-box"
              >
                <li>
                  <Link to="/profile" className="hover:bg-neutral-focus">Profile</Link>
                </li>
                <li>
                  <Link to="/settings" className="hover:bg-neutral-focus">Settings</Link>
                </li>
                <li>
                  <a onClick = {signOut} className="hover:bg-neutral-focus">Logout</a>
                </li>
              </ul>
            </div> 
          : 
            <div className="flex space-x-4"> 
                  <Link to="/login" className="btn btm-nav-label btn-neutral">
                    Login
                  </Link>
                  <Link to="/signup" className="btn btm-nav-label btn-neutral">
                    Signup
                  </Link>
                </div>
                }
              </div>
            </div>
  );
};

export default Navbar;