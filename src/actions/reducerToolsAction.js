import { REDUCER_CLEAN_REQUEST, FETCH_USER_INFO, CLEAN_USER_INFO } from "../constants/actionTypes"

export const reducerCleanRequest = () => {
  return {
    type: REDUCER_CLEAN_REQUEST,
  }
}

export const headingRequest = (data) => {
  return {
    type: "HEADING",
    data,
  }
}

export const userInfoRequest = (data) => {
  return {
    type: FETCH_USER_INFO,
    data,
  }
}

export const userInfoCleanRequest = (data) => {
  return {
    type: CLEAN_USER_INFO,
    data,
  }
}
