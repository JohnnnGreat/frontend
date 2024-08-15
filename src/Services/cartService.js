import axios from "axios";

const API_URL = "http://localhost:5000/api/carts";
const token = JSON.parse(localStorage.getItem("token"));

export const addItemToCartService = async ({ productId, quantity }) => {
  const response = await axios.post(
    `${API_URL}/add`,
    { productId, quantity },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getCartService = async () => {
  const response = await axios.get(`${API_URL}/`, {
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const removeItemFromCart = async (productId) => {
  const response = await axios.delete(`${API_URL}/remove/${productId}`, {
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  });
  console.log(response);
  return response.data;
};

export const clearCartService = async () => {
  const response = await axios.delete(`${API_URL}/clear`, {
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  });
  return response.data;
};
