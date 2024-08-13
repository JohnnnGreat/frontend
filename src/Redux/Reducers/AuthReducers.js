// redux/reducers/authReducer.js

import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, AUTH, SETUSER, UPDATEPROFILE } from "../types";

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("profile", JSON.stringify(action.payload));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };

    case LOGOUT:
      localStorage.removeItem("profile");
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case AUTH:
      localStorage.setItem("profile", JSON.stringify(action.payload));
      return {
        ...state,
        user: action?.payload,
        isAuthenticated: true,
      };
    case SETUSER: {
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    }

    default:
      return state;
  }
};

export default authReducer;
