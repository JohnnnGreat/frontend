import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { message } from 'antd';

import { getProduct } from './ProductDetails/action';
import OtherProducts from '../ProductsComponents/OtherProducts';
import { addToCart } from '../Cart/actions';

const ProductDetails = () => {
  const productId = useLocation().pathname.split('/')[2];

  const dispatch = useDispatch();
  const { isLoading, product } = useSelector(state => state?.products);
  const isLoggedIn = useSelector(state => state.login.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProduct(productId, message));
  }, [dispatch, productId]);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      message.warning(`You need to login to add to cart`);
      return navigate('/login');
    }
    dispatch(addToCart({ productId, quantity: 4 }, message));
  };
  return (
    <div>
      <div className='container max-w-[1200px] mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='flex flex-col'>
            <div className='h-96 overflow-hidden rounded-lg mb-4'>
              <img
                src={product?.images && product.images[0]}
                alt={product?.name}
                className='h-full w-full object-cover border'
              />
            </div>
            <div className='flex space-x-2'>
              {product?.images?.map((image, index) => (
                <img
                  key={index}
                  src={image && image}
                  alt={`Product ${index + 1}`}
                  className='h-24 w-24 object-cover rounded-lg shadow-md'
                />
              ))}
            </div>
          </div>

          {/* Product Details Section */}
          <div className='flex flex-col border p-4'>
            <h1 className='text-3xl font-bold mb-4'>{product.name}</h1>
            <p className='text-gray-700 mb-2 font-light text-[.8rem]'>
              <span className='font-medium '>Uploaded by:</span> {product?.uploadedBy?.name} (
              {product?.uploadedBy?.email})
            </p>
            <hr className='mt-[.3rem]' />
            <p className='text-gray-700 mt-[.8rem] '>{product.description}</p>
            <p className='text-2xl font-medium text-green-600 mb-4'>${product.price}</p>

            <div className='mb-6'>
              <p className='text-gray-700 mb-2 font-light'>
                <span className='font-medium'>Brand:</span> {product.brand}
              </p>
              <p className='text-gray-700 mb-2 font-light'>
                <span className='font-medium'>Category:</span> {product.category}
              </p>
              <p className='text-gray-700 mb-2 font-light'>
                <span className='font-medium'>In Stock:</span> {product.countInStock}
              </p>
              <p className='text-gray-700 mb-2'>
                <span className='font-font-medium'>Rating:</span> {product.rating} (
                {product.numReviews} reviews)
              </p>
            </div>

            {/* Add to Cart Section */}
            <div className='mt-auto'>
              {product.countInStock > 0 ? (
                <button
                  onClick={handleAddToCart}
                  className='bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-200'
                >
                  Add to Cart
                </button>
              ) : (
                <p className='text-red-600 font-semibold'>Out of Stock</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <OtherProducts />
    </div>
  );
};

export default ProductDetails;
