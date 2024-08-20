import React, { useEffect } from "react";
import { dummyOrderData } from "../Components/dummy";
import ShippingInfo from "../Components/Orders/ShippingInfo";
import PaymentInfo from "../Components/Orders/PaymentInfo";
import OrderItem from "../Components/Orders/OrderItem";
import OrderSummary from "../Components/Orders/OrderSummary";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersByUser } from "../Components/Orders/actions";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const orders = useSelector(state => state.orders.orders);
  console.log(orders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrdersByUser());
  }, [dispatch]);
  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Order Details</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {orders.map(order => (
          <Link to={`orders/${order._id}`} className='border p-3 rounded-md'>
            <h1 className='font-medium'>Shipping Address: {order?.shippingAddress.street}</h1>
            <h1 className='font-medium'>
              Items: <span>{order.orderItems.length}</span>
            </h1>
            <hr />
            <div className='flex gap-2'>
              <p className='font-medium'>
                Price: <span className='font-light'>{order.totalPrice}</span>
              </p>
              <p className='font-medium'>
                Status: <span>{order.isDelivered ? " Delivered" : "Not Delivered"}</span>
              </p>
            </div>
          </Link>
        ))}
        <div className='col-span-2'>
          <ShippingInfo shippingAddress={dummyOrderData.shippingAddress} />
          <PaymentInfo paymentMethod={dummyOrderData.paymentMethod} />
          <OrderItem orderItems={dummyOrderData.orderItems} />
        </div>
        <div className='col-span-1'>
          <OrderSummary order={dummyOrderData} />
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
