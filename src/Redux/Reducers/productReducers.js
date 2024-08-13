const { CREATE_NEW_PRODUCTS, GET_PRODUCT_BY_ID } = require("../types");

const initialState = {
  products: [],
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
    default:
      return state;
  }
};
