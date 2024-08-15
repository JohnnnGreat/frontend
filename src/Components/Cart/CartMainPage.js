import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCart, addToCart, removeFromCart, clearCart } from "../../Redux/Actions/cartActions";
import { message } from "antd";

const CartMainPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.carts?.cart?.items);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId, message));
  };

  const handleClearCart = () => {
    dispatch(clearCart(message));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Shopping Cart</h1>

      {cart?.length === 0 ? (
        <div className="text-center">
          <p>Your cart is empty.</p>
          <Link to="/products" className="text-blue-500">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.product._id}
              className="flex justify-between items-center bg-gray-100 p-4 rounded"
            >
              <Link to={`/product/${item.product._id}`} className="text-lg font-semibold">
                {item.product.name}
              </Link>
              <div className="flex items-center space-x-4">
                <span>Quantity: {item.quantity}</span>
                <button
                  onClick={() => handleRemoveFromCart(item.product._id)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button onClick={handleClearCart} className="bg-red-500 text-white p-2 rounded mt-4">
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default CartMainPage;
