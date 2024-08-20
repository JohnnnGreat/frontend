import axios from "axios";
import { GET_PRODUCT, GET_PRODUCTS, IS_LOADING, SET_ERROR } from "./constants";

const API_URL = "http://localhost:5000/api/products";
const token = JSON.parse(localStorage.getItem("token"));

export const addProductAction = (credentials, navigate, message) => async dispatch => {
  dispatch({ type: IS_LOADING, payload: true });
  try {
    const response = await axios.post(`${API_URL}`, credentials, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    dispatch({ type: IS_LOADING, payload: false });
    console.log(response);
    dispatch({ type: "CREATE_NEW_PRODUCTS", payload: response.data });
    message.success("Producted Added ");
    navigate("/");
  } catch (error) {
    dispatch({ type: IS_LOADING, payload: false });
    message.error(error?.message);
  }
};

// export const getProductById = (id, message) => async dispatch => {
//   console.log(id);
//   try {
//     const response = await axios.get(`${API_URL}`, {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//     console.log(response);
//     message.success('Products Received');
//   } catch (error) {
//     message.error('Failed to Fetch Products');
//   }
// };

export const getAllProducts = message => async dispatch => {
  dispatch({ type: IS_LOADING, payload: true });
  try {
    const response = await axios.get(`${API_URL}`, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    console.log(response);
    dispatch({ type: GET_PRODUCTS, payload: response.data });
    dispatch({ type: SET_ERROR, payload: {} });
    dispatch({ type: IS_LOADING, payload: false });
  } catch (error) {
    dispatch({ type: IS_LOADING, payload: false });
    dispatch({ type: GET_PRODUCTS, payload: [] });
    dispatch({ type: SET_ERROR, payload: { message: "An error had occured" } });
  }
};

export const getProduct = (id, message) => async dispatch => {
  dispatch({ type: IS_LOADING, payload: true });
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    dispatch({ type: GET_PRODUCT, payload: response.data });
    dispatch({ type: IS_LOADING, payload: false });
    dispatch({ type: SET_ERROR, payload: {} });
    message.success("Products Details Fetched");
  } catch (error) {
    message.error("Failed to Fetch Product Details");
    dispatch({ type: IS_LOADING, payload: false });
    dispatch({ type: SET_ERROR, payload: { message: "An error had occured" } });
  }
};

export const getProductById = (id, message) => async dispatch => {
  try {
    const response = await axios.get(`${API_URL}/uploaded-by/${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      }
    });
    console.log("product fetching action", response);
    dispatch({ type: "GET_PRODUCT_BY_ID", payload: response.data });
    message.success("Products Received");
  } catch (error) {
    console.log(error);
    message.error("Failed to Fetch Products");
  }
};
