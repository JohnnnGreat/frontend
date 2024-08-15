import React from "react";
import { DollarSign, Truck, CheckCircle } from "lucide-react";

const OrderSummary = ({ order }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md mb-4">
      <h2 className="text-xl font-semibold mb-2 flex items-center">
        <DollarSign className="mr-2" />
        Order Summary
      </h2>
      <div className="flex justify-between mb-2">
        <span>Items:</span>
        <span>${order.orderItems.reduce((acc, item) => acc + item.qty * item.price, 0)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Shipping:</span>
        <span>${order.shippingPrice}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Tax:</span>
        <span>${order.taxPrice}</span>
      </div>
      <div className="flex justify-between font-bold mb-2">
        <span>Total:</span>
        <span>${order.totalPrice}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Status:</span>
        <span>{order.isPaid ? <CheckCircle className="text-green-500" /> : "Not Paid"}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Delivered:</span>
        <span>{order.isDelivered ? "Yes" : <Truck className="text-yellow-500" />}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
