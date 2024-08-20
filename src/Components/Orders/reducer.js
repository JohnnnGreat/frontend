const initialState = {
  order: null,
  orders: []
};

export const orderReducers = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_A_NEW_ORDER":
      return {
        ...state,
        orders: [...state.orders, action.payload]
      };
    case "GET_ORDERS":
      return {
        ...state,
        orders: action.payload
      };
    default:
      return state;
  }
};
