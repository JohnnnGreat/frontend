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
  console.log(token);
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
