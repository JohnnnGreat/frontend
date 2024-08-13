import { Divide } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { CircleUser } from "lucide-react";

const UserProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="flex-2 w-[400px]">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Account Menu</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/profile" className="hover:underline">
                  Profile Overview
                </Link>
              </li>
              <li>
                <Link to="orders" className="hover:underline">
                  My Orders
                </Link>
              </li>
              {user?.role === "admin" && (
                <li>
                  <Link to="products" className="hover:underline">
                    My Products
                  </Link>
                </li>
              )}
              <li>
                <Link to="settings" className="hover:underline">
                  Account Settings
                </Link>
              </li>
              <li>
                <button className="hover:underline focus:outline-none">Logout</button>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
