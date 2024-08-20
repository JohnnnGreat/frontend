import axios from "axios";
import { USER_FETCH_FAILURE, USER_FETCH_SUCCESS } from "./constants";
const API_URL = "http://localhost:5000/api/users";

const token = JSON.parse(localStorage.getItem("token"));

export const fetchUser = userId => {
  return async dispatch => {
    // dispatch({type});
    try {
      const response = await axios.get(`${API_URL}/getuser/${userId}`);
      const user = response.data.user;

      // dispatch({ type: USER_FETCH_SUCCESS });
    } catch (error) {
      const errorMsg = error.response ? error.response.data.message : error.message;
      console.log(errorMsg);
      dispatch({
        type: USER_FETCH_FAILURE,
        payload: { message: "An erroc had occured fetching information" }
      });
    }
  };
};

export const updateUser = (userId, userInfo) => {
  console.log(userId, userInfo);
  return async dispatch => {
    // dispatch({type});
    try {
      const response = await axios.put(`${API_URL}/updateprofile/${userId}`, userInfo, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
      });
      const user = response.data.user;
      console.log(user);
      dispatch({ type: USER_FETCH_SUCCESS, payload: user });
    } catch (error) {
      const errorMsg = error.response ? error.response.data.message : error.message;

      dispatch({
        type: USER_FETCH_FAILURE,
        payload: { message: "An error had occured fetching information" }
      });
    }
  };
};
