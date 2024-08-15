import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getProduct, getProductById } from "../../Redux/Actions/ProductActions";
import { message } from "antd";
import { getProductService } from "../../Services/ProductService";
import io from "socket.io-client";
import { addToCart } from "../../Redux/Actions/cartActions";

const ProductDetails = () => {
  const productId = useLocation().pathname.split("/")[2];

  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.product);
  const user = useSelector((state) => state.auth.user);
  console.log(user);

  useEffect(() => {
    dispatch(getProduct(productId, message));
  }, []);

  const handleAddToCart = () => {
    dispatch(addToCart({ productId, quantity: 4 }, message));
  };
  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Images Section */}
          <div className="flex flex-col">
            <div className="h-96 overflow-hidden rounded-lg mb-4">
              <img
                src={product.images[0]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="h-24 w-24 object-cover rounded-lg shadow-md"
                />
              ))}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-700 mb-6">{product.description}</p>
            <p className="text-2xl font-bold text-green-600 mb-4">${product.price}</p>

            <div className="mb-6">
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Brand:</span> {product.brand}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Category:</span> {product.category}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">In Stock:</span> {product.countInStock}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Rating:</span> {product.rating} (
                {product.numReviews} reviews)
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Uploaded by:</span> {product.uploadedBy.name} (
                {product.uploadedBy.email})
              </p>
            </div>

            {/* Add to Cart Section */}
            <div className="mt-auto">
              {product.countInStock > 0 ? (
                <button
                  onClick={handleAddToCart}
                  className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-200"
                >
                  Add to Cart
                </button>
              ) : (
                <p className="text-red-600 font-semibold">Out of Stock</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
