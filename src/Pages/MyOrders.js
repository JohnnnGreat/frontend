import React, { useEffect, useState } from "react";
import { dummyOrderData } from "../Components/dummy";
import ShippingInfo from "../Components/Orders/ShippingInfo";
import PaymentInfo from "../Components/Orders/PaymentInfo";
import OrderItem from "../Components/Orders/OrderItem";
import OrderSummary from "../Components/Orders/OrderSummary";
import { useDispatch, useSelector } from "react-redux";
import { getOrderBySearch, getOrdersByUser } from "../Components/Orders/actions";
import { Link } from "react-router-dom";
import { Input } from "../Components/ui/input";
import { Button } from "../Components/ui/button";
import { message } from "antd";

const MyOrders = () => {
  const orders = useSelector(state => state.orders.orders);

  console.log(orders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrdersByUser());
  }, [dispatch]);

  const [orderId, setOrderId] = useState("");
  const handleSearchProduct = e => {
    setOrderId(e.target.value);
    dispatch(getOrdersByUser());
  };

  const handleSubmitSearch = () => {
    dispatch(getOrderBySearch(orderId, message));
  };
  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-1'>Order Details</h1>
      <p className='mb-4 font-light text-[.9rem]'>{orders.length} Orders Found</p>
      <hr />
      <div>
        <div className='flex gap-2 my-[1rem]'>
          <Input className='input' placeholder='Search Products' onChange={handleSearchProduct} />
          <Button onClick={handleSubmitSearch}>Search</Button>
        </div>
      </div>

      <div className='flex flex-col gap-4'>
        {orders?.map(order => (
          <Link
            to={`orders/${order._id}`}
            className='border border-gray-300 p-3 rounded-md flex flex-1 w-full gap-5 items-center'
          >
            <img
              className='w-[100px] rounded-sm'
              src='https://mtek3d.com/wp-content/uploads/2018/01/image-placeholder-500x500.jpg'
              alt='Order placeholder'
            />
            <div>
              <h1 className='text-gray-400 font-light text-[.8rem]'>
                Order ID: <span className='text-gray-800 font-normal'>{order?._id}</span>{" "}
              </h1>
              <h1 className='text-gray-400 font-light text-[.8rem] mt-[.2rem]'>
                Shipping Address:{" "}
                <span className='text-gray-800'>{order?.shippingAddress?.street}</span>
              </h1>
              <h1 className='text-gray-400 font-light text-[.8rem]'>
                Items: <span className='font-normal text-gray-700'>{order.orderItems.length}</span>
              </h1>
              <hr />
              <div className='flex gap-2'>
                <p className='text-gray-400 font-light text-[.8rem]'>
                  Price: <span className='text-gray-800 font-normal'>{order.totalPrice}</span>
                </p>
                <p className='text-gray-400 font-light text-[.8rem]'>
                  Status:{" "}
                  <span className='text-gray-800 font-normal'>
                    {order.isDelivered ? " Delivered" : "Not Delivered"}
                  </span>
                </p>
              </div>
            </div>
          </Link>
        ))}
        {/*   <div className='col-span-2'>
          <ShippingInfo shippingAddress={dummyOrderData.shippingAddress} />
          <PaymentInfo paymentMethod={dummyOrderData.paymentMethod} />
          <OrderItem orderItems={dummyOrderData.orderItems} />
        </div>
        <div className='col-span-1'>
          <OrderSummary order={dummyOrderData} />
        </div> */}
      </div>
    </div>
  );
};

export default MyOrders;
