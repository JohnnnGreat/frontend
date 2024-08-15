import { combineReducers } from "redux";
import authReducer from "./AuthReducers"; // Adjust the path if necessary
import { productsReducer } from "./productReducers";
import { cartReducer } from "./cartReducers";

const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  carts: cartReducer,
  // Add other reducers here
});

export default rootReducer;
