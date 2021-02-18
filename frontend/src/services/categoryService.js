import {
  FETCH_CATEGORY_LIST,
  FETCH_CATEGORY_LIST_SUCCESS,
  FETCH_CATEGORY_LIST_FAILURE,
  FETCH_CATEGORY_BY_ID,
  FETCH_CATEGORY_BY_ID_SUCCESS,
  FETCH_CATEGORY_BY_ID_FAILURE,
  FETCH_SUB_CATEGORY_LIST,
  FETCH_SUB_CATEGORY_LIST_SUCCESS,
  FETCH_SUB_CATEGORY_LIST_FAILURE,
} from "../constants/actionTypes";
import { get, post, deleteData, update } from "../utils/httpUtils";
import history from "../utils/historyUtil";

export const fetchCategoryList = (query) => {
  return get(
    FETCH_CATEGORY_LIST,
    FETCH_CATEGORY_LIST_SUCCESS,
    FETCH_CATEGORY_LIST_FAILURE,
    "api/category",
    query
  );
};

export const fetchSubCategoryList = (categoryId, query) => {
  return get(
    FETCH_SUB_CATEGORY_LIST,
    FETCH_SUB_CATEGORY_LIST_SUCCESS,
    FETCH_SUB_CATEGORY_LIST_FAILURE,
    `api/category/${categoryId}/sub`,
    query
  );
};

export const fetcCategoryById = (identifier) => {
  return get(
    FETCH_CATEGORY_BY_ID,
    FETCH_CATEGORY_BY_ID_SUCCESS,
    FETCH_CATEGORY_BY_ID_FAILURE,
    `api/category/${identifier}`
  );
};

export const addNewCategory = (formData) => {
  return post(`api/category/add`, formData)
    .then(() => {
      //   Notification("Success!", `Category has been added successfully!`, "success")
      history.push("/categories");
    })
    .catch((err) => {
      // Notification("Error!", "Something went wrong!", "error");
    });
};

export const addNewSubCategory = (formData) => {
  return post(`api/category/sub/add`, formData);
};

export const editCategory = (formData, identifier) => {
  return update(`api/category/edit/${identifier}`, formData);
};

export const editSubCategory = (formData, identifier) => {
  return update(`api/category/sub/edit/${identifier}`, formData);
};

export const deleteCategory = (identifier) => {
  return deleteData(`api/category/delete/${identifier}`);
};

export const deleteSubCategory = (identifier) => {
  return deleteData(`api/category/sub/delete/${identifier}`);
};
