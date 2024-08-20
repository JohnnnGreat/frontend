import axios from 'axios';
import { LOGIN_CHANGE, SET_LOGIN_FORM_ERRORS, SET_LOGIN_LOADING } from './constants';
const API_URL = 'http://localhost:5000/api/users';

// Login action
export const loginAction = (credentials, message, navigate) => async dispatch => {
  /* Process Login Extra Errors */

  dispatch({ type: SET_LOGIN_LOADING, payload: true });
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    const { email, password } = response?.data?.user;
    localStorage.setItem('token', JSON.stringify(response?.data?.token));
    dispatch({ type: LOGIN_CHANGE, payload: { email, password } });
    dispatch({ type: 'USER_FETCH_SUCCESS', payload: response.data.user });
  } catch (error) {
    dispatch({ type: SET_LOGIN_FORM_ERRORS, payload: { message: error.response.data.message } });
    dispatch({ type: SET_LOGIN_LOADING, payload: false });
  } finally {
    dispatch({ type: SET_LOGIN_LOADING, payload: false });
  }
};
