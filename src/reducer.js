import { combineReducers } from 'redux';

import { loginReducer } from './Components/Auth/Login/reducers';
import { accountReducer } from './Components/Account/Profile/reducer';
import { productReducer } from './Components/Products/ProductDetails/reducer';
import { cartReducer } from './Components/Cart/reducer';

const rootReducer = combineReducers({
  login: loginReducer,
  account: accountReducer,
  products: productReducer,
  carts: cartReducer
});

export default rootReducer;
