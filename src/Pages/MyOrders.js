import React, { useEffect } from "react";
import { dummyOrderData } from "../Components/dummy";
import ShippingInfo from "../Components/Orders/ShippingInfo";
import PaymentInfo from "../Components/Orders/PaymentInfo";
import OrderItem from "../Components/Orders/OrderItem";
import OrderSummary from "../Components/Orders/OrderSummary";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersByUser } from "../Redux/Actions/orderActions";

const MyOrders = () => {
  const orders = useSelector((state) => console.log(state.orders));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersByUser());
  }, [dispatch]);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <ShippingInfo shippingAddress={dummyOrderData.shippingAddress} />
          <PaymentInfo paymentMethod={dummyOrderData.paymentMethod} />
          <OrderItem orderItems={dummyOrderData.orderItems} />
        </div>
        <div className="col-span-1">
          <OrderSummary order={dummyOrderData} />
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
