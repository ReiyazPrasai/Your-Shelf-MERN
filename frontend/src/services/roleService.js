import {
    FETCH_ROLE_LIST,
    FETCH_ROLE_LIST_SUCCESS,
    FETCH_ROLE_LIST_FAILURE,
    FETCH_ROLE_BY_ID,
    FETCH_ROLE_BY_ID_SUCCESS,
    FETCH_ROLE_BY_ID_FAILURE,
  } from "../constants/actionTypes";
  import { get, post, deleteData, update } from "../utils/httpUtils";
  import history from "../utils/historyUtil";
  
  export const fetchRoleList = (query) => {
    return get(
      FETCH_ROLE_LIST,
      FETCH_ROLE_LIST_SUCCESS,
      FETCH_ROLE_LIST_FAILURE,
      "api/role",
      query
    );
  };
  
  export const fetcRoleById = (identifier) => {
    return get(
      FETCH_ROLE_BY_ID,
      FETCH_ROLE_BY_ID_SUCCESS,
      FETCH_ROLE_BY_ID_FAILURE,
      `api/role/${identifier}`
    );
  };
  
  export const addNewRole = (formData) => {
    return post(`api/role/add`, formData)
      .then(() => {
        //   Notification("Success!", `Role has been added successfully!`, "success")
        history.push("/roles");
      })
      .catch((err) => {
        // Notification("Error!", "Something went wrong!", "error");
      });
  };
  
  export const editRole = (formData, identifier) => {
    return update(`api/role/edit/${identifier}`, formData);
  };
  
  export const deleteRole = (identifier) => {
    return deleteData(`api/role/delete/${identifier}`);
  };
  