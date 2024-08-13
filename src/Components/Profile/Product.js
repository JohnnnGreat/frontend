import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { getProductById } from "../../Redux/Actions/ProductActions";

const Product = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    dispatch(getProductById(user._id));
  }, [user]);

  return (
    <div className="overflow-auto w-full">
      <div className="flex justify-between w-full">
        <h1>My Added Products</h1>
        <Link to="add">Add a Product</Link>
      </div>
      <div className="grid grid-cols-3 gap-[1rem] p-[1rem]">
        {products?.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={product.imageUrl || product.images[0]}
              alt={product.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-gray-900 font-bold text-xl mb-2">${product.price}</p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Brand:</span> {product.brand}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Category:</span> {product.category}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">In Stock:</span> {product.countInStock}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Rating:</span> {product.rating} (
                {product.numReviews} reviews)
              </p>
            </div>
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default Product;
