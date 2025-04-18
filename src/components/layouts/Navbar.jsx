import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { token, setToken, setUserState } = useAuth();
  const navigate = useNavigate();
  const logoutHandler = () => {
    sessionStorage.removeItem("token");
    setToken("");
    navigate("/login");
    setUserState(null);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav
      style={{ display: token ? "block" : "none" }}
      className="bg-blue-500 text-white p-4"
    >
      {/* Mobile Hamburger */}
      <div className="flex justify-end items-center md:hidden">
        <button onClick={toggleMenu}>
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      <div
        className={`flex-col md:flex md:flex-row transition-all duration-300 ease-in-out ${
          isMenuOpen ? "flex" : "hidden"
        } md:items-center`}
      >
        <Link to="/" className="mx-4 mt-2 md:mt-0">
          Home
        </Link>
        <Link to="/all-posts" className="mx-4 mt-2 md:mt-0">
          All Posts
        </Link>

        <button
          onClick={logoutHandler}
          className="mx-4 mt-2 md:mt-0 md:ml-auto text-white"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
