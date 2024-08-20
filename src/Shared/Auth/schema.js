import { z } from "zod";

export const authSchema = z.object({
  email: z.string().min(2, {
    message: "Email is invalid"
  }),
  password: z.string().min(4, {
    message: "Password must be at least 8 characters."
  })
});

export const shippingSchema = z.object({
  address: z.string().min(2, {
    message: "Address must be at least 2 characters."
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters."
  }),
  postalCode: z.string().min(2, {
    message: "Postal must be at least 2 characters."
  }),
  country: z.string().min(2, {
    message: "Country must be at least 2 characters."
  })
});

export const userSchema = z.object({
  street: z.string().min(2, {
    message: "Address must be at least 2 characters."
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters."
  }),
  name: z.string().min(2, {
    message: "Postal must be at least 2 characters."
  }),
  country: z.string().min(2, {
    message: "Country must be at least 2 characters."
  })
});
