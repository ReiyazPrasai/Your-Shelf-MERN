import {
  FETCH_COMPANY_LIST,
  FETCH_COMPANY_LIST_SUCCESS,
  FETCH_COMPANY_LIST_FAILURE,
  FETCH_COMPANY_BY_ID,
  FETCH_COMPANY_BY_ID_SUCCESS,
  FETCH_COMPANY_BY_ID_FAILURE,
} from "../constants/actionTypes";
import { get, post, deleteData, update } from "../utils/httpUtils";
import history from "../utils/historyUtil";

export const fetchCompanyList = (query) => {
  return get(
    FETCH_COMPANY_LIST,
    FETCH_COMPANY_LIST_SUCCESS,
    FETCH_COMPANY_LIST_FAILURE,
    "api/company",
    query
  );
};

export const fetchCompanyById = (identifier) => {
  return get(
    FETCH_COMPANY_BY_ID,
    FETCH_COMPANY_BY_ID_SUCCESS,
    FETCH_COMPANY_BY_ID_FAILURE,
    `api/company/${identifier}`
  );
};

export const editCompany = (formData, identifier) => {
  return update(`api/company/edit/${identifier}`, formData);
};

export const deleteCompany = (identifier) => {
  return deleteData(`api/company/delete/${identifier}`);
};
