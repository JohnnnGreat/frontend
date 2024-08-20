// pages/SignupPage.js
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../../../Components/ui/form';
import { Input } from '../../../Components/ui/input';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../Components/ui/button';
import { Loader2 } from 'lucide-react';
import { useContext, useEffect, useMemo, useState } from 'react';
import { message } from 'antd';
import { authSchema } from '../../../Shared/Auth/schema';
import { loginAction } from './actions';

const LoginPage = () => {
  const dispatch = useDispatch();
  const [loginCount, setLoginCount] = useState(0);
  const navigate = useNavigate();
  const loginError = useSelector(state => state.login.formErrors.message);
  const formData = useSelector(state => state.login.isAuthenticated);
  const state = useSelector(state => state.login);
  console.log(formData);
  useEffect(() => {
    if (formData) {
      navigate('/');
    }
  }, [formData, navigate]);

  useMemo(() => {
    if (loginError) {
      message.error(loginError);
    }
  }, [loginCount, loginError]);

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const handleSubmit = async values => {
    setIsLoading(true);
    setLoginCount(loginCount + 1);
    dispatch(loginAction(values, message, navigate));

    setIsLoading(false);

    navigate('/');
  };

  return (
    <div className='container bg-[#EBD407] h-screen flex items-center justify-center'>
      <div className='wrapper w-[800px] grid grid-cols-1 md:grid-cols-2 bg-white p-[2rem] rounded-lg'>
        <div className='image-display'></div>
        <div className='form'>
          <h1 className='text-[#6A6A6A] text-[2rem] my-4 font-semibold'>Login</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-2'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-[.9rem] font-semibold'>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder='Email Address' {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-[.9rem] font-semibold'>Username</FormLabel>
                    <FormControl>
                      <Input placeholder='Password' {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isLoading} className='w-full mt-[1rem]' type='submit'>
                {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                Submit
              </Button>
              <p className='text-[14px] font-medium'>
                Yet to Sign Up{' '}
                <Link className='underline' to='/signup'>
                  Register
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
