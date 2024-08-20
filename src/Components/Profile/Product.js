import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

import { message } from "antd";
import ProductCard from "../ProductsComponents/ProductCard";
import { getProductById } from "../Products/ProductDetails/action";

const Product = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);

  const { user } = useSelector(state => state.account);
  useEffect(() => {
    dispatch(getProductById(user._id, message));
  }, [user, dispatch]);

  return (
    <div className='overflow-auto w-full'>
      <div>
        <div className='flex justify-between w-full'>
          <h1>My Added Products</h1>
          <Link to='add'>Add a Product</Link>
        </div>
        <p className='mt-[1rem] text-[.8rem] font-semibold'>{products.length} Products</p>
        {products.length === 0 ? (
          <div className='w-full h-full flex flex-col items-center justify-center'>
            <p className='text-gray-500 font-light'>No Products found</p>
            <Link to='add' className='undeline mt-3 flex gap-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
              </svg>
              Add Product
            </Link>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-[1rem] p-[1rem]'>
            {products?.map(product => (
              <ProductCard product={product} />
            ))}
          </div>
        )}
      </div>

      <Outlet />
    </div>
  );
};

export default Product;
