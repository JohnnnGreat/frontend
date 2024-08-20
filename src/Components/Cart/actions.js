// src/actions/cartActions.js
import axios from "axios";
import {
  GET_CART_SUCCESS,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  REMOVE_FROM_CART_SUCCESS,
  CLEAR_CART,
  CART_ERROR,
  IS_LOADING
} from "./constants";

const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api/carts"
    : "https://backend-commerce-eiue.onrender.com/api/carts";

const token = JSON.parse(localStorage.getItem("token"));

export const getCart = () => async dispatch => {
  dispatch({ type: IS_LOADING, payload: true });
  try {
    const response = await axios.get(`${API_URL}`, {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    });

    dispatch({ type: GET_CART_SUCCESS, payload: response.data });
    dispatch({ type: IS_LOADING, payload: false });
  } catch (error) {
    dispatch({ type: IS_LOADING, payload: false });
    dispatch({ type: CART_ERROR, payload: { message: "Failed to get cart" } });
  }
};

export const clearCart = message => async dispatch => {
  dispatch({ type: IS_LOADING, payload: true });
  try {
    const response = await axios.delete(`${API_URL}/clear`, {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    });

    dispatch({ type: CLEAR_CART, payload: response.data });
    dispatch({ type: IS_LOADING, payload: false });
    message.success("Your Cart has been cleared");
  } catch (error) {
    message.error("Failed to clear cart");
    dispatch({ type: IS_LOADING, payload: false });
    dispatch({ type: CART_ERROR, payload: { message: "Failed to clear cart" } });
  }
};

export const removeFromCart = (productId, message) => async dispatch => {
  dispatch({ type: IS_LOADING, payload: true });
  try {
    const response = await axios.delete(`${API_URL}/remove/${productId}`, {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    });

    dispatch({ type: REMOVE_FROM_CART_SUCCESS, payload: response.data });
    dispatch({ type: IS_LOADING, payload: false });
    message.success("Item removed from cart");
  } catch (error) {
    dispatch({ type: IS_LOADING, payload: false });

    message.error("Failed to remove item from cart");
  }
};

export const addToCart =
  ({ productId, quantity }, message) =>
  async dispatch => {
    dispatch({ type: IS_LOADING, payload: true });
    try {
      const response = await axios.post(
        `${API_URL}/add`,
        { productId, quantity },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );
      dispatch({ type: IS_LOADING, payload: false });
      dispatch({ type: ADD_TO_CART_SUCCESS, payload: response.data });
      dispatch({ type: CART_ERROR, payload: {} });
    } catch (error) {
      dispatch({ type: IS_LOADING, payload: false });
      dispatch({ type: CART_ERROR, payload: { message: "Failed to add to cart" } });
      dispatch({ type: ADD_TO_CART_FAIL, payload: error.response.data.message });
    }
  };
