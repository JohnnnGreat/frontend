import axios from "axios";
import { addOrderService, getOrdersByUserService } from "../../Services/orderService";

// Add Order
export const addOrderAction = (orderBody, message) => async (dispatch) => {
  try {
    const response = await addOrderService(orderBody);
    dispatch({ type: "ADD_A_NEW_ORDER", payload: response });
  } catch (error) {
    console.log(error);
  }
};

export const getOrdersByUser = () => async (dispatch) => {
  try {
    const response = await getOrdersByUserService();
    dispatch({ type: "GET_ORDERS", payload: response });
  } catch (error) {
    console.log(error);
  }
};
