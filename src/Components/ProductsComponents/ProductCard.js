import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/products/${product._id}`}
      key={product?._id}
      className='bg-white rounded-lg shadow-md overflow-hidden'
    >
      <img
        src={product?.imageUrl || product?.images[0] || ''}
        alt={product?.name}
        className='h-48 w-full object-cover'
      />
      <div className='p-4'>
        <p className=' text-[#858585] font-light '>{product?.category}</p>
        <h3 className=' font-semibold mb-2'>{product?.name}</h3>

        <p className='text-gray-900 font-bold '>${product?.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
