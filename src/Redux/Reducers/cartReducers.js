const initialState = {
  cart: {},
  loading: false,
  error: null,
};
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CART_SUCCESS":
      console.log(action);
      return { ...state, cart: action.payload, loading: false };
    case "ADD_TO_CART_SUCCESS":
      return { ...state, cart: action.payload, loading: false };
    case "ADD_TO_CART_FAIL":
      return { ...state, error: action.payload, loading: false };
    case "REMOVE_FROM_CART_SUCCESS":
      return { ...state, cart: action.payload, loading: false };
    case "REMOVE_FROM_CART_FAIL":
      return { ...state, error: action.payload, loading: false };
    case "CLEAR_CART_ON_LOGOUT":
      return { ...state, cart: action.payload };
    default:
      return state;
  }
};
