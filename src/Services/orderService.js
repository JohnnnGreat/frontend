import axios from "axios";

const API_URL = "http://localhost:5000/api/orders";
const token = JSON.parse(localStorage.getItem("token"));

export const addOrderService = async (orderBody) => {
  const response = await axios.post(`${API_URL}`, orderBody, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getOrdersByUserService = async () => {
  const response = await axios.get(`${API_URL}/myorders`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
