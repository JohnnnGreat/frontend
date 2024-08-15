import React from "react";
import { ShoppingCart } from "lucide-react";

const OrderItem = ({ orderItems }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md mb-4">
      <h2 className="text-xl font-semibold mb-2 flex items-center">
        <ShoppingCart className="mr-2" />
        Order Items
      </h2>
      {orderItems.map((item, index) => (
        <div key={index} className="flex items-center mb-4">
          <img src={item.image} alt={item.name} className="w-16 h-16 rounded mr-4" />
          <div className="flex-grow">
            <p className="font-semibold">{item.name}</p>
            <p>Quantity: {item.qty}</p>
            <p>${item.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderItem;
