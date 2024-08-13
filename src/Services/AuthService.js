// services/authService.js

import axios from "axios";

const API_URL = "http://localhost:5000/api/users"; // Replace with your API URL

export const loginService = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/login`, userData);

  return response;
};

export const signupService = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response;
};

export const updateProfileImage = async (formData) => {
  console.log(formData);
  const response = await axios.post(`${API_URL}/uploads/uploadImage`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(response);
  return response;
};
