// src/Components/Layout.js

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/Actions/AuthActions";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <Link to="/" className="text-2xl font-bold">
              E-Commerce
            </Link>
          </div>
          <nav className="flex space-x-4">
            <Link to="/" className="hover:text-gray-400">
              Home
            </Link>
            <Link to="/products" className="hover:text-gray-400">
              Products
            </Link>
            <Link to="/cart" className="hover:text-gray-400">
              Cart
            </Link>

            {isAuthenticated ? (
              <div className="flex space-x-4 items-center">
                <Link to="/profile" className="hover:text-gray-400">
                  {user?.name || "Profile"}
                </Link>
                <button onClick={handleLogout} className="hover:text-gray-400 focus:outline-none">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login" className="hover:text-gray-400">
                  Login
                </Link>
                <Link to="/signup" className="hover:text-gray-400">
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          &copy; {new Date().getFullYear()} E-Commerce. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
