import { combineReducers } from "redux";
import authReducer from "./AuthReducers"; // Adjust the path if necessary
import { productsReducer } from "./productReducers";
import { cartReducer } from "./cartReducers";
import { orderReducers } from "./orderReducers";

const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  carts: cartReducer,
  orders: orderReducers,
  // Add other reducers here
});

export default rootReducer;
