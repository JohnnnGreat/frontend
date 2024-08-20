import { Divide } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { CircleUser } from "lucide-react";

const UserProfilePage = () => {
  const { user } = useSelector(state => state.account);
  console.log(user);
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6'>My Profile</h1>

      <div className='flex flex-col gap-6 md:flex-row'>
        {/* Sidebar */}
        <div className='flex-2 w-full md:w-[400px]'>
          <div className='bg-white p-4 rounded-lg border'>
            <h2 className='text-xl font-semibold mb-4'>Account Menu</h2>
            <hr className='mt-[.7rem]' />
            <ul className=' flex flex-col gap-2 '>
              <li>
                <Link to='/profile' className=' hover:bg-gray-100 inline-block w-full py-2 px-2'>
                  Profile Overview
                </Link>
              </li>
              <li>
                <Link to='orders' className=' hover:bg-gray-100 inline-block w-full py-2 px-2'>
                  My Orders
                </Link>
              </li>
              {user?.role === "admin" && (
                <li>
                  <Link to='products' className=' hover:bg-gray-100 inline-block w-full py-2 px-2'>
                    My Products
                  </Link>
                </li>
              )}
              <li>
                <Link to='settings' className=' hover:bg-gray-100 inline-block w-full py-2 px-2'>
                  Account Settings
                </Link>
              </li>
              <li>
                <button className=' hover:bg-gray-100 inline-block w-full py-2 px-2'>Logout</button>
              </li>
            </ul>
          </div>
        </div>
        <div className='flex-1'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
