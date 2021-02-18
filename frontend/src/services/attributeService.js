import {
  FETCH_ATTRIBUTE_LIST,
  FETCH_ATTRIBUTE_LIST_SUCCESS,
  FETCH_ATTRIBUTE_LIST_FAILURE,
  FETCH_ATTRIBUTE_BY_ID,
  FETCH_ATTRIBUTE_BY_ID_SUCCESS,
  FETCH_ATTRIBUTE_BY_ID_FAILURE,
} from "../constants/actionTypes";
import { get, post, deleteData, update } from "../utils/httpUtils";
import history from "../utils/historyUtil";

export const fetchAttributeList = (query) => {
  return get(
    FETCH_ATTRIBUTE_LIST,
    FETCH_ATTRIBUTE_LIST_SUCCESS,
    FETCH_ATTRIBUTE_LIST_FAILURE,
    "api/attribute",
    query
  );
};

export const fetcAttributeById = (identifier) => {
  return get(
    FETCH_ATTRIBUTE_BY_ID,
    FETCH_ATTRIBUTE_BY_ID_SUCCESS,
    FETCH_ATTRIBUTE_BY_ID_FAILURE,
    `api/attribute/${identifier}`
  );
};

export const addNewAttribute = (formData) => {
  return post(`api/attribute/add`, formData)
    .then(() => {
      //   Notification("Success!", `Attribute has been added successfully!`, "success")
      history.push("/attributes");
    })
    .catch((err) => {
      // Notification("Error!", "Something went wrong!", "error");
    });
};

export const editAttribute = (formData, identifier) => {
  return update(`api/attribute/edit/${identifier}`, formData);
};

export const deleteAttribute = (identifier) => {
  return deleteData(`api/attribute/delete/${identifier}`);
};
