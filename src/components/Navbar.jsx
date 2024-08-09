import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  let { user, setUser, setAuthTokens, logoutUser } = useAuth();
  const navigate = useNavigate();

  user = localStorage.getItem("authTokens")
    ? jwtDecode(localStorage.getItem("authTokens"))
    : null;

  logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
  };

  return (
    <nav className="border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="text-teal-700 font-extrabold text-3xl">
            QUIZZ
          </a>
          <div className="hidden md:flex items-center space-x-4">
            {user !== null ? (
              <>
                <button
                  onClick={logoutUser}
                  className="bg-teal-700 px-4 py-2 rounded-lg text-white font-bold"
                >
                  Logout
                </button>
                <div
                  className="w-10 h-10 bg-teal-700 cursor-pointer rounded-full flex items-center justify-center text-white text-xl font-bold"
                  onClick={() => navigate("/profile")}
                >
                  {user.image ? (
                    <img
                      src={`http://localhost:8000${user.image}`}
                      alt="profile"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    user.username[0].toUpperCase()
                  )}
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-teal-700 text-white px-4 py-2 rounded-lg font-bold"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="bg-teal-700 text-white px-4 py-2 rounded-lg font-bold"
                >
                  Signup
                </button>
              </>
            )}
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-teal-700 hover:text-teal-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {user !== null ? (
              <>
                <button
                  onClick={logoutUser}
                  className="bg-teal-700 text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                >
                  Logout
                </button>
                <button
                  onClick={() => navigate("/profile")}
                  className="bg-teal-700 text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                >
                  Profile
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-teal-700 text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="bg-teal-700 text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                >
                  Signup
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}