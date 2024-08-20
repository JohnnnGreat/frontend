import axios from "axios";

const token = JSON.parse(localStorage.getItem("token"));

const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api/orders"
    : "https://backend-commerce-eiue.onrender.com/api/orders";

// Add Order
export const addOrderAction = (orderBody, message) => async dispatch => {
  try {
    const response = await axios.post(`${API_URL}`, orderBody, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    dispatch({ type: "ADD_A_NEW_ORDER", payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const getOrdersByUser = () => async dispatch => {
  try {
    const response = await axios.get(`${API_URL}/myorders`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    dispatch({ type: "GET_ORDERS", payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const getOrderBySearch = (orderId, message) => async dispatch => {
  try {
    const response = await axios.get(`${API_URL}/getorderbysearch/${orderId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.data.idFound) {
      message.error(response.data.message);
      return dispatch({ type: "GET_SEARCHED_ORDER", payload: response.data.orders });
    } else {
      message.success(response.data.message);
      dispatch({ type: "GET_SEARCHED_ORDER", payload: [response.data.orders] });
    }
  } catch (error) {
    message.error(error.response.data.message);
  }
};
