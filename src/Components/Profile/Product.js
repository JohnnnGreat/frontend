import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { getProductById } from "../../Redux/Actions/ProductActions";
import { message } from "antd";
import ProductCard from "../Products/ProductCard";

const Product = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    dispatch(getProductById(user._id, message));
  }, [user]);
  console.log(products);
  return (
    <div className="overflow-auto w-full">
      <div>
        <div className="flex justify-between w-full">
          <h1>My Added Products</h1>
          <Link to="add">Add a Product</Link>
        </div>
        <p className="mt-[1rem] text-[.8rem] font-semibold">{products.length} Products</p>
        <div className="grid grid-cols-3 gap-[1rem] p-[1rem]">
          {products?.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default Product;
