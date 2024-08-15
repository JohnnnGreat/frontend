import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../Products/ProductCard";

const HomeSectionDisplay = () => {
  const products = useSelector((state) => state.products.products);
  
  return (
    <div>
      <h1 className="text-[1.6rem] font-semibold">All Products</h1>
      <hr className="my-[1rem]" />
      <div className="grid grid-cols-3 gap-3">
        {products.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomeSectionDisplay;
