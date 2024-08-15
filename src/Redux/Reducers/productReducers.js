const {
  CREATE_NEW_PRODUCTS,
  GET_PRODUCT_BY_ID,
  GET_ALL_PRODUCTS,
  GET_PRODUCT,
} = require("../types");

const initialState = {
  products: [],
  product: {},
};

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NEW_PRODUCTS:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        products: action.payload,
      };
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };

    default:
      return state;
  }
};
