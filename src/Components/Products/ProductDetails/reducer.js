import {GET_PRODUCT, GET_PRODUCT_BY_ID, GET_PRODUCTS, GET_SEARCHED_PRODUCTS, IS_LOADING, SET_ERROR} from "./constants";

const initialProductState = {
    product: {},
    products: [],
    error: {},
    isLoading: false
};

export const productReducer = (state = initialProductState, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            };
        case SET_ERROR:
            return {
                ...state,
                error: action.payload
            };

        case IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };
        case GET_PRODUCT:
            return {
                ...state,
                product: action.payload
            };

        case GET_PRODUCT_BY_ID:
            return {
                ...state,
                products: action.payload
            };
        case GET_SEARCHED_PRODUCTS:
            return {
                ...state,
                products: action.payload
            };
        default:
            return state;
    }
};
