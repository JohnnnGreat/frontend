import axios from "axios";
import {
  addItemToCartService,
  clearCartService,
  getCartService,
  removeItemFromCart,
} from "../../Services/cartService";

export const getCart = () => async (dispatch) => {
  console.log("get cart called");
  try {
    const response = await getCartService();
    console.log(response);
    dispatch({ type: "GET_CART_SUCCESS", payload: response });
  } catch (error) {
    console.log(error);
  }
};

export const addToCart =
  ({ productId, quantity }, message) =>
  async (dispatch) => {
    console.log(productId, quantity);
    try {
      const response = await addItemToCartService({ productId, quantity });
      console.log(response);
      dispatch({ type: "ADD_TO_CART_SUCCESS", payload: response });
    } catch (error) {
      console.log(error);
      dispatch({ type: "ADD_TO_CART_FAIL", payload: error.response.data.message });
    }
  };

export const removeFromCart = (productId, message) => async (dispatch) => {
  try {
    const response = await removeItemFromCart(productId);
    console.log(response);
    dispatch({ type: "REMOVE_FROM_CART_SUCCESS", payload: response });
    message.success("Cart Removed");
  } catch (error) {
    dispatch({ type: "REMOVE_FROM_CART_FAIL", payload: error.response.data.message });
  }
};

export const clearCart = (message) => async (dispatch) => {
  try {
    const response = await clearCartService();
    console.log(response);
    dispatch({ type: "CLEAR_CART_SUCCESS", payload: response });
    message.success("Your Cart Have been cleared");
  } catch (error) {
    message.error("Failed to Clear Cart");
  }
};
