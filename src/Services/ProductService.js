import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

const token = JSON.parse(localStorage.getItem("token"));

export const addProduct = async (productInformation) => {
  const response = await axios.post(`${API_URL}`, productInformation, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export const uploadImagesService = async (productImages) => {
  const response = await axios.post(`${API_URL}/uploadImages`, productImages, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getProductsById = async (id) => {
  const response = await axios.get(`${API_URL}/uploaded-by/${id}`, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
