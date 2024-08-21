import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from "react-redux";
import {Button} from "../ui/button";

const ProductCard = ({product}) => {
    const isAuthenticated = useSelector(state => state.login.isAuthenticated);
    const handleProductDelete = (productId) => {
        console.log(productId)
    }
    return (
        <div
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
                <p className=' text-[#858585] font-light tracking-widest text-[.8rem]'>{product?.category}</p>
                <hr/>
                <h3 className='mt-1 font-medium mb-2'>{product?.name}</h3>

                <p className='text-gray-900 font-medium '>${product?.price}</p>

                {isAuthenticated && (
                    <div className='mt-[1rem] grid items-center gap-2 grid-cols-2'>
                        <Button
                            onClick={() => {
                                handleProductDelete(product._id)
                            }}
                            className='rounded font-normal hover:bg-red-500 hover:text-white inline-block w-full py-2 px-2 bg-red-50 text-red-500'>Delete
                            Product</Button>
                        <Link to={'/'} className={'text-gray-700 hover:text-gray-500'}>Edit
                            Product</Link>
                    </div>

                )}
            </div>
        </div>
    );
};

export default ProductCard;
