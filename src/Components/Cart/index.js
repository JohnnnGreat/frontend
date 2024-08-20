import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { message } from 'antd';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import ShippingInfo from '../Orders/ShippingInfo';
import { addOrderAction } from '../../Redux/Actions/orderActions';
import { clearCart, getCart, removeFromCart } from './actions';
import { shippingSchema } from '../../Shared/Auth/schema';

const CartMainPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.carts.cart.items);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [taxPrice, setTaxPrice] = useState(2000);

  const [paymentOption, setPaymentOption] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [formFields, setFormFields] = useState(null);
  let totalPriceOfItems = 0;

  for (let i = 0; i < cart?.length; i++) {
    const totalSumForEachProduct = cart[i]?.product?.price * cart[i]?.quantity;
    totalPriceOfItems += totalSumForEachProduct;
  }

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const form = useForm({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      address: '',
      city: '',
      postalCode: '',
      country: ''
    }
  });

  const handleRemoveFromCart = productId => {
    dispatch(removeFromCart(productId, message));
  };

  const handleClearCart = () => {
    dispatch(clearCart(message));
  };

  const handleSubmit = async values => {
    setFormFields(values);
  };

  const handleOptionChange = value => {
    setPaymentOption(value);
  };

  const handlePaymentMethod = value => {
    setPaymentMethod(value);
  };
  const handleOrderInformation = () => {
    setIsLoading(true);
    if (!formFields) {
      message.error('Please fill in the shipping address form.');
      return;
    }

    if (!paymentOption) {
      message.error('Please select a shipping option.');
      return;
    }
    const initialBody = {
      shippingAddress: { ...formFields },
      orderItems: cart,
      totalPrice: totalPriceOfItems,
      isPaid: false,
      isDelivered: false,
      taxPrice: taxPrice,
      // user: userId,
      shippingInformation: paymentOption,
      paymentMethod: paymentMethod
    };

    dispatch(addOrderAction(initialBody, message));
    setIsLoading(false);
  };
  return (
    <div className='container mx-auto p-4'>
      <div className='set-shipping'>
        <div>
          {' '}
          <h1 className='text-2xl font-bold mb-4'>Your Shopping Cart</h1>
          {cart?.length === 0 ? (
            <div className='text-center'>
              <p>Your cart is empty.</p>
              <Link to='/products' className='text-blue-500'>
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className='space-y-4'>
              {cart?.map(item => {
                console.log('this is the item', item.product);
                return (
                  <div
                    key={item?.product?._id}
                    className='flex justify-between items-center bg-gray-100 p-4 rounded'
                  >
                    <Link to={`/product/${item.product._id}`} className='text-lg font-semibold'>
                      {item.product.name}
                    </Link>
                    <div className='flex items-center space-x-4'>
                      <span>Quantity: {item.quantity}</span>
                      <button
                        onClick={() => handleRemoveFromCart(item.product._id)}
                        className='text-red-500'
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
              <button onClick={handleClearCart} className='bg-red-500 text-white p-2 rounded mt-4'>
                Clear Cart
              </button>
            </div>
          )}
        </div>
        <div>
          <h1 className='font-semibold text-[1.2rem]'>Set your Shipping Information</h1>
          <p>Set your shipping information for this order</p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-2 mt-[.8rem]'>
              <FormField
                control={form.control}
                name='address'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-[.9rem] font-semibold'>Address</FormLabel>
                    <FormControl>
                      <Input placeholder='Address' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='city'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-[.9rem] font-semibold'>City</FormLabel>
                    <FormControl>
                      <Input placeholder='City' {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='grid grid-cols-2 gap-[.8rem]'>
                <FormField
                  control={form.control}
                  name='postalCode'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-[.9rem] font-semibold'>Postal Code</FormLabel>
                      <FormControl>
                        <Input placeholder='Postal Code' {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='country'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-[.9rem] font-semibold'>Country</FormLabel>
                      <FormControl>
                        <Input placeholder='Country' {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button disabled={isLoading} className='w-full mt-[1rem]' type='submit'>
                {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                Save Shipping Information
              </Button>
            </form>
          </Form>

          <div className='mt-[1rem]'>
            <h1>How do you want to pay?</h1>
            <Select onValueChange={handleOptionChange}>
              <SelectTrigger className='w-full mt-[.8rem]'>
                <SelectValue placeholder='Choose Payment Option' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='onDeliver'>Pay on Delivery</SelectItem>
                <SelectItem value='deposit'>Make Deposit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div
            className={`mt-[1rem] h-0 overflow-hidden transition-all duration-300 ${
              paymentOption === 'deposit' && 'h-[70px]'
            }`}
          >
            <h1>Choose your payment method</h1>
            <Select onValueChange={handlePaymentMethod}>
              <SelectTrigger className='w-full mt-[.8rem]'>
                <SelectValue placeholder='Payment Method' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='card'>Card</SelectItem>
                <SelectItem value='transfer'>Transfer</SelectItem>
                <SelectItem value='paypal'>Paypal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='mt-[1rem] grid grid-cols-2'>
            <div>
              <h1 className='font-semibold'>Price</h1>
              <p>{`${totalPriceOfItems}.00`} Naira</p>
            </div>
            <div>
              <h1 className='font-semibold'>Tax Price</h1>
              <p>{taxPrice} Naira</p>
            </div>
          </div>

          <Button onClick={handleOrderInformation} className='w-full mt-[.8rem]'>
            Proceed
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartMainPage;
