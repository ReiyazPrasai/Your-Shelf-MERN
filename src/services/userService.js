import {
  FETCH_USER_LIST,
  FETCH_USER_LIST_SUCCESS,
  FETCH_USER_LIST_FAILURE,
  FETCH_USER_BY_ID,
  FETCH_USER_BY_ID_SUCCESS,
  FETCH_USER_BY_ID_FAILURE,
} from "../constants/actionTypes";
import { get, post, deleteData, update } from "../utils/httpUtils";
import history from "../utils/historyUtil";

export const fetchUserList = (query) => {
  return get(
    FETCH_USER_LIST,
    FETCH_USER_LIST_SUCCESS,
    FETCH_USER_LIST_FAILURE,
    "api/user",
    query
  );
};

export const fetchUserById = (identifier) => {
  return get(
    FETCH_USER_BY_ID,
    FETCH_USER_BY_ID_SUCCESS,
    FETCH_USER_BY_ID_FAILURE,
    `api/user/${identifier}`
  );
};

export const addNewUser = (formData) => {
  return post("api/user/register", formData);
};

export const userLogin = (formData) => {
  return post("api/user/login", formData);
};

export const editUser = (formData, identifier) => {
  return update(`api/user/edit/${identifier}`, formData);
};

export const deleteUser = (identifier) => {
  return deleteData(`api/user/delete/${identifier}`);
};

