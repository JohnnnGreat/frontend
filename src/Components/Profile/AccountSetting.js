import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../../Components/ui/form";
import { Input } from "../../Components/ui/input";
import { Button } from "../../Components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { shippingSchema, userSchema } from "../../Shared/Auth/schema";
import { fetchUser, updateUser } from "../Account/Profile/actions";

const AccountSetting = () => {
  const userId = useSelector(state => state?.account?.user?._id);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchUser(userId, dispatch);
  }, [dispatch, userId]);
  const user = useSelector(state => state?.account?.user);
  console.log(user);
  const form = useForm({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      address: "",
      city: "",
      postalCode: "",
      country: ""
    }
  });

  const userForm = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      street: "",
      city: "",
      country: ""
    }
  });

  const handleSubmit = async values => {
    console.log(values);
  };

  const handleSaveAccount = async values => {
    dispatch(updateUser(userId, values));
  };

  useEffect(() => {
    if (user) {
      userForm.setValue("name", user.name);
      userForm.setValue("city", user?.address?.city);
      userForm.setValue("street", user?.address?.street);
      userForm.setValue("country", user?.address?.country);
    }
  }, [user, userForm]);
  return (
    <div>
      <h1 className='text-[1.6rem] font-semibold'>Account Settings</h1>
      <hr className='my-[.5rem]' />
      <div className='shipping-grid'>
        <div className='w-full'>
          <h1 className='my-[.8rem]'>Account Information</h1>

          <Form {...userForm}>
            <form onSubmit={userForm.handleSubmit(handleSaveAccount)} className='space-y-2'>
              <FormField
                control={userForm.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-[.9rem] font-semibold'>Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={userForm.control}
                name='street'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-[.9rem] font-semibold'>Street</FormLabel>
                    <FormControl>
                      <Input placeholder='Street' {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='grid grid-cols-2 gap-[.8rem]'>
                <FormField
                  control={userForm.control}
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
                <FormField
                  control={userForm.control}
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
                Save Information
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <div className='shipping-grid'>
        <div>
          <h1 className='my-[.8rem]'>Shipping Information</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-2'>
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
                  name='Country'
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
        </div>
      </div>
    </div>
  );
};

export default AccountSetting;
