import {
    FETCH_PRODUCT_LIST,
    FETCH_PRODUCT_LIST_SUCCESS,
    FETCH_PRODUCT_LIST_FAILURE,
    FETCH_PRODUCT_BY_ID,
    FETCH_PRODUCT_BY_ID_SUCCESS,
    FETCH_PRODUCT_BY_ID_FAILURE,
  } from "../constants/actionTypes";
  import { get, post, deleteData, update } from "../utils/httpUtils";
  import history from "../utils/historyUtil";
  
  export const fetchProductList = (query) => {
    return get(
      FETCH_PRODUCT_LIST,
      FETCH_PRODUCT_LIST_SUCCESS,
      FETCH_PRODUCT_LIST_FAILURE,
      "api/product",
      query
    );
  };
  
  export const fetchProductById = (identifier) => {
    return get(
      FETCH_PRODUCT_BY_ID,
      FETCH_PRODUCT_BY_ID_SUCCESS,
      FETCH_PRODUCT_BY_ID_FAILURE,
      `api/product/${identifier}`
    );
  };
  
  export const addNewProduct = (formData) => {
    return post(`api/product/add`, formData)
      .then(() => {
        //   Notification("Success!", `Product has been added successfully!`, "success")
        history.push("/products");
      })
      .catch((err) => {
        // Notification("Error!", "Something went wrong!", "error");
      });
  };
  
  export const editProduct = (formData, identifier) => {
    return update(`api/product/edit/${identifier}`, formData);
  };
  
  export const deleteProduct = (identifier) => {
    return deleteData(`api/product/delete/${identifier}`);
  };
  