// redux/actions/authActions.js

import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, AUTH } from "../types";
import { loginService, signupService } from "../../Services/AuthService";

// Login action
export const login = (credentials, message, navigate) => async (dispatch) => {
  try {
    const { data } = await loginService(credentials);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
      token: data.token,
    });
    const token = data.token;
    localStorage.setItem("token", JSON.stringify(token));
    message.success(data.message);
    navigate("/");
    return data.user;
  } catch (error) {
    console.log(error);
  }
};

export const signup = (credentials, message, navigate) => async (dispatch) => {
  try {
    const { data } = await signupService(credentials);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
      token: data.token,
    });
    const token = data.token;
    localStorage.setItem("token", JSON.stringify(token));
    message.success(data.message);
    navigate("/");
  } catch (error) {
    message.error(error?.response?.data?.message);
  }
};

// Logout action
export const logout = (navigate) => (dispatch) => {
  dispatch({ type: LOGOUT });
  navigate("/login");
};
