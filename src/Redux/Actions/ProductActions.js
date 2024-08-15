import {
  addProduct,
  getAllProductsService,
  getProductsById,
  getProductService,
} from "../../Services/ProductService";
import { GET_PRODUCT } from "../types";

export const addProductAction = (credentials, navigate, message) => async (dispatch) => {
  try {
    const { data } = await addProduct(credentials);
    dispatch({ type: "CREATE_NEW_PRODUCTS", payload: data });
    message.success("Producted Added ");
    navigate("/");
  } catch (error) {
    message.error(error?.message);
  }
};

export const getProductById = (id, message) => async (dispatch) => {
  try {
    const data = await getProductsById(id);

    dispatch({ type: "GET_PRODUCT_BY_ID", payload: data });
    message.success("Products Received");
  } catch (error) {
    message.error("Failed to Fetch Products");
  }
};

export const getAllProducts = (message) => async (dispatch) => {
  try {
    const data = await getAllProductsService();
    dispatch({ type: "GET_ALL_PRODUCTS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getProduct = (id, message) => async (dispatch) => {
  try {
    const data = await getProductService(id);
    dispatch({ type: GET_PRODUCT, payload: data });
    message.success("Products Details Fetched");
  } catch (error) {
    message.error("Failed to Fetch Product Details");
  }
};
