import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { addProductAction } from "../../Redux/Actions/ProductActions";
import { useDispatch } from "react-redux";
import { uploadImagesService } from "../../Services/ProductService";
import { Loader2 } from "lucide-react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    setIsAddingProduct(true);
    await dispatch(addProductAction(values, navigate, message));
    form.reset();
    setIsAddingProduct(false);
  };

  const handleImageUpload = async (event) => {
    setIsUploadingImages(true);
    const files = event.target.files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    const response = await uploadImagesService(formData);

    setUploadedImages(response.fileUrls);
    form.setValue("images", response?.fileUrls);
    message.success(response.fileUrls.length + " Images Added Succesfully");
    setIsUploadingImages(false);
  };

  return (
    <div className="mt-[1rem] p-[1.4rem] ">
      <hr />
      <h1 className="font-bold text-2xl mt-[1rem] mb-[.9rem]">Add A New Product</h1>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
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
                    <Input placeholder="Description" {...field} />
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
                      <Input placeholder="Brand" {...field} />
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
            </div>
            <div className="flex w-full items-center gap-3">
              <FormField
                control={form.control}
                name="images"
                render={() => (
                  <FormItem className="w-full">
                    <FormLabel className="text-[.9rem] font-semibold ">Upload Images</FormLabel>
                    <FormControl>
                      <Input className="flex-1" type="file" multiple onChange={handleImageUpload} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isUploadingImages && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            </div>
            <div className="flex gap-2 mt-2">
              {uploadedImages.map((url, index) => {
                return (
                  <img
                    src={url}
                    alt="product display"
                    className="w-[100px] h-[100px] object-cover rounded"
                  />
                );
              })}
            </div>
            <Button isDisables={isAddingProduct} className="w-full mt-[1rem]" type="submit">
              {isAddingProduct && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Product
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddProduct;
