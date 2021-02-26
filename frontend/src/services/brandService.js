import {
  FETCH_BRAND_LIST,
  FETCH_BRAND_LIST_SUCCESS,
  FETCH_BRAND_LIST_FAILURE,
  FETCH_BRAND_BY_ID,
  FETCH_BRAND_BY_ID_SUCCESS,
  FETCH_BRAND_BY_ID_FAILURE,
} from "../constants/actionTypes";
import { get, post, deleteData, update } from "../utils/httpUtils";
import history from "../utils/historyUtil";

export const fetchBrandList = (query) => {
  return get(
    FETCH_BRAND_LIST,
    FETCH_BRAND_LIST_SUCCESS,
    FETCH_BRAND_LIST_FAILURE,
    "api/brand",
    query
  );
};

export const fetcBrandById = (identifier) => {
  return get(
    FETCH_BRAND_BY_ID,
    FETCH_BRAND_BY_ID_SUCCESS,
    FETCH_BRAND_BY_ID_FAILURE,
    `api/brand/${identifier}`
  );
};

export const addNewBrand = (formData) => {
  return post(`api/brand/add`, formData)
    .then(() => {
      //   Notification("Success!", `Brand has been added successfully!`, "success")
      history.push("/features/brands");
    })
    .catch((err) => {
      // Notification("Error!", "Something went wrong!", "error");
    });
};

export const editBrand = (formData, identifier) => {
  return update(`api/brand/edit/${identifier}`, formData);
};

export const deleteBrand = (identifier) => {
  return deleteData(`api/brand/delete/${identifier}`);
};
