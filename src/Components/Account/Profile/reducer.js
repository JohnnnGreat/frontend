import { USER_FETCH_FAILURE, USER_FETCH_SUCCESS, USER_START_FETCH } from "./constants";

const initialState = {
  user: {},
  isFetchingUser: false,
  error: null
};

export const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_START_FETCH:
      return { ...state, isFetchingUser: true, error: null };
    case USER_FETCH_SUCCESS:
      return { ...state, user: action.payload, isFetchingUser: false };
    case USER_FETCH_FAILURE:
      return { ...state, isFetchingUser: false, error: action.payload };
    case "USER_RESET":
      return { ...state, user: {} };
    default:
      return state;
  }
};
