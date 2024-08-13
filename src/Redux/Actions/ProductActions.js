import { addProduct, getProductsById } from "../../Services/ProductService";

export const addProductAction = (credentials, navigate) => async (dispatch) => {
  try {
    const { data } = await addProduct(credentials);
    dispatch({ type: "CREATE_NEW_PRODUCTS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = (id) => async (dispatch) => {
  console.log(id);
  try {
    const data = await getProductsById(id);
    console.log(data);
    dispatch({ type: "GET_PRODUCT_BY_ID", payload: data });
  } catch (error) {
    console.log(error);
  }
};
