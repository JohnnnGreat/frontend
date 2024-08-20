// src/reducers/cartReducer.js
import {
  GET_CART_SUCCESS,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  CART_ERROR,
  CLEAR_CART,
  IS_LOADING,
  REMOVE_FROM_CART_SUCCESS
} from './constants';

const initialState = {
  cart: {
    items: []
  },
  isLoading: false,
  error: null
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART_SUCCESS:
      return { ...state, cart: action.payload, isLoading: false };
    case ADD_TO_CART_SUCCESS:
      return { ...state, cart: action.payload, isLoading: false };
    case REMOVE_FROM_CART_SUCCESS:
      return { ...state, cart: action.payload, isLoading: false };
    case CART_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    case CLEAR_CART:
      return { ...state, cart: { items: [] }, isLoading: false };
    case IS_LOADING:
      return { ...state, isLoading: true };

    default:
      return state;
  }
};
