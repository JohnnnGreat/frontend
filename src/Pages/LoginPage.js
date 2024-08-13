// pages/SignupPage.js
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../Components/ui/form";
import { Input } from "../Components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "../Redux/Actions/AuthActions";
import { Button } from "../Components/ui/button";
import { Loader2 } from "lucide-react";
import { useContext, useState } from "react";
import { message } from "antd";

const SignupPage = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    email: z.string().min(2, {
      message: "Email must be at least 2 characters.",
    }),
    password: z.string().min(2, {
      message: "Password must be at least 2 characters.",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    await dispatch(login(values, message, navigate));

    setIsLoading(false);
  };

  return (
    <div className="container bg-[#EBD407] h-screen flex items-center justify-center">
      <div className="wrapper w-[800px] grid grid-cols-1 md:grid-cols-2 bg-white p-[2rem] rounded-lg">
        <div className="image-display"></div>
        <div className="form">
          <h1 className="text-[#6A6A6A] text-[2rem] my-4 font-semibold">Login</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[.9rem] font-semibold">Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Email Address" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[.9rem] font-semibold">Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Password" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isLoading} className="w-full mt-[1rem]" type="submit">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit
              </Button>
              <p className="text-[14px] font-medium">
                Yet to Sign Up{" "}
                <Link className="underline" to="/signup">
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

export default SignupPage;
