import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { addProductAction } from "../../Redux/Actions/ProductActions";
import { useDispatch } from "react-redux";
import { uploadImagesService } from "../../Services/ProductService";

const AddProduct = () => {
  const dispatch = useDispatch();
  const [uploadedImages, setUploadedImages] = useState([]);

  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    description: z.string().min(5, {
      message: "Description must be at least 5 characters",
    }),

    brand: z.string().min(1, {
      message: "Brand is required",
    }),
    category: z.string().min(1, {
      message: "Category is required.",
    }),
    price: z.string().min(1, {
      message: "Price is required.",
    }),
    countInStock: z.string().min(1, {
      message: "Stock count is required",
    }),
    images: z.array(z.string()).optional(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      brand: "",
      category: "",
      countInStock: 0,
      images: [],
    },
  });

  const handleSubmit = async (values) => {
    console.log(values);
    await dispatch(addProductAction(values));
  };

  const handleImageUpload = async (event) => {
    const files = event.target.files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    const response = await uploadImagesService(formData);

    setUploadedImages(response.fileUrls);
    form.setValue("images", response?.fileUrls);
  };

  const onInvalid = (errors) => console.log(uploadedImages);
  return (
    <div className="mt-[1rem] p-[1.4rem] ">
      <hr />
      <h1 className="font-bold text-2xl mt-[1rem] mb-[.9rem]">Add A New Product</h1>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit, onInvalid)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[.9rem] font-semibold">Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Product Name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[.9rem] font-semibold">Description</FormLabel>
                  <FormControl>
                    <Input placeholder="description" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid md:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[.9rem] font-semibold">Price </FormLabel>
                    <FormControl>
                      <Input placeholder="Price" type="number" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[.9rem] font-semibold">Brand </FormLabel>
                    <FormControl>
                      <Input placeholder="brand" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[.9rem] font-semibold">Category</FormLabel>
                    <FormControl>
                      <Input placeholder="Category" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="countInStock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[.9rem] font-semibold">Count In Stock</FormLabel>
                    <FormControl>
                      <Input placeholder="Count In Stock" type="number" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="images"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-[.9rem] font-semibold">Upload Images</FormLabel>
                    <FormControl>
                      <Input type="file" multiple onChange={handleImageUpload} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-2 mt-2">
              {uploadedImages.map((url, index) => {
                return <img src={url} className="w-[100px] h-[100px] object-cover rounded" />;
              })}
            </div>
            <Button className="w-full mt-[1rem]" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddProduct;
