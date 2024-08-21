import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import ProductCard from "../ProductsComponents/ProductCard";
import {getAllProducts} from "../Products/ProductDetails/action";

const HomeSectionDisplay = () => {
    const products = useSelector(state => state?.products?.products);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    console.log(products);
    return (
        // TODO: Fetch products from Redux store on mount

        <div className='w-full p-3'>
            <h1 className='text-[1.6rem] font-semibold'>All Products</h1>
            <hr className='my-[1rem]'/>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                {products.map(product => (
                    <ProductCard product={product}/>
                ))}
            </div>
        </div>
    );
};

export default HomeSectionDisplay;
