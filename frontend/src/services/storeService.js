import {
  FETCH_STORE_LIST,
  FETCH_STORE_LIST_SUCCESS,
  FETCH_STORE_LIST_FAILURE,
  FETCH_STORE_BY_ID,
  FETCH_STORE_BY_ID_SUCCESS,
  FETCH_STORE_BY_ID_FAILURE,
} from "../constants/actionTypes";
import { get, post, deleteData, update } from "../utils/httpUtils";
import history from "../utils/historyUtil";

export const fetchStoreList = (query) => {
  return get(
    FETCH_STORE_LIST,
    FETCH_STORE_LIST_SUCCESS,
    FETCH_STORE_LIST_FAILURE,
    "api/store",
    query
  );
};

export const fetcStoreById = (identifier) => {
  return get(
    FETCH_STORE_BY_ID,
    FETCH_STORE_BY_ID_SUCCESS,
    FETCH_STORE_BY_ID_FAILURE,
    `api/store/${identifier}`
  );
};

export const addNewStore = (formData) => {
  return post(`api/store/add`, formData)
    .then(() => {
      //   Notification("Success!", `Store has been added successfully!`, "success")
      history.push("/stores/manage");
    })
    .catch((err) => {
      // Notification("Error!", "Something went wrong!", "error");
    });
};

export const editStore = (formData, identifier) => {
  return update(`api/store/edit/${identifier}`, formData)
  
};

export const deleteStore = (identifier) => {
  return deleteData(`api/store/${identifier}`)
    .then((res) => {
      // !multiple &&
      //   Notification(
      //     "Success!",
      //     `Contact has been deleted successfully!`,
      //     "success"
      //   )
      // redirect && history.push(`/contacts/list`)
    })
    .catch((err) => {
      // Notification("Error!", "Something went wrong!", "error")
    });
};
