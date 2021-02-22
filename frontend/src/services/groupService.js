import {
  FETCH_GROUP_LIST,
  FETCH_GROUP_LIST_SUCCESS,
  FETCH_GROUP_LIST_FAILURE,
  FETCH_GROUP_BY_ID,
  FETCH_GROUP_BY_ID_SUCCESS,
  FETCH_GROUP_BY_ID_FAILURE,
} from "../constants/actionTypes";
import { get, post, deleteData, update } from "../utils/httpUtils";
import history from "../utils/historyUtil";

export const fetchGroupList = (query) => {
  return get(
    FETCH_GROUP_LIST,
    FETCH_GROUP_LIST_SUCCESS,
    FETCH_GROUP_LIST_FAILURE,
    "api/group",
    query
  );
};

export const fetcGroupById = (identifier) => {
  return get(
    FETCH_GROUP_BY_ID,
    FETCH_GROUP_BY_ID_SUCCESS,
    FETCH_GROUP_BY_ID_FAILURE,
    `api/group/${identifier}`
  );
};

export const addNewGroup = (formData) => {
  return post(`api/group/add`, formData)
    .then(() => {
      //   Notification("Success!", `Group has been added successfully!`, "success")
      history.push("/groups");
    })
    .catch((err) => {
      // Notification("Error!", "Something went wrong!", "error");
    });
};

export const editGroup = (formData, identifier) => {
  return update(`api/group/edit/${identifier}`, formData);
};

export const deleteGroup = (identifier) => {
  return deleteData(`api/group/delete/${identifier}`);
};
