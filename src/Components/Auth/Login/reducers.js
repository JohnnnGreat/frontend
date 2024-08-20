// redux/reducers/authReducer.js

import {
  LOGIN_CHANGE,
  LOGIN_RESET,
  SET_LOGIN_FORM_ERRORS,
  SET_LOGIN_SUBMITTING,
  SET_LOGIN_LOADING,
  LOGOUT
} from "./constants";

const initialState = {
  loginFormData: {
    email: "",
    password: ""
  },
  formErrors: {},
  isSubmitting: false,
  isLoading: false,
  isAuthenticated: false
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_CHANGE:
      return {
        ...state,
        loginFormData: {
          ...state.loginFormData,
          ...action.payload
        },
        isAuthenticated: true
      };

    case SET_LOGIN_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload
      };
    case SET_LOGIN_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };

    case LOGIN_RESET:
      return {
        ...state,
        loginFormData: {
          email: "",
          password: ""
        },
        formErrors: {},
        isSubmitting: false,
        isLoading: false
      };

    default:
      return state;
  }
};

export default loginReducer;
