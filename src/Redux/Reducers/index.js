import { combineReducers } from "redux";
import authReducer from "./AuthReducers"; // Adjust the path if necessary
import { productsReducer } from "./productReducers";

const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  // Add other reducers here
});

export default rootReducer;
