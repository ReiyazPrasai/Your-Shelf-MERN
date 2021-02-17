import {
    REDUCER_CLEAN_REQUEST,
    FETCH_STORE_LIST,
    FETCH_STORE_LIST_SUCCESS,
    FETCH_STORE_LIST_FAILURE,
    FETCH_STORE_BY_ID,
    FETCH_STORE_BY_ID_SUCCESS,
    FETCH_STORE_BY_ID_FAILURE,
  } from "../../constants/actionTypes";
  
  const INITIAL_STATE = {
    payload: [],
    loading: false,
    errors: {},
  };
  
  /**
   * A reducer takes two arguments, the current state and an action.
   */
  export const storeListReducer = (state, action) => {
    state = state || INITIAL_STATE;
    switch (action?.type) {
      case FETCH_STORE_LIST:
        return Object.assign({}, state, {
          loading: true,
        });
      case FETCH_STORE_LIST_SUCCESS:
        return Object.assign({}, state, {
          payload: action?.data?.data,
          loading: false,
          errors: {},
        });
  
      case FETCH_STORE_LIST_FAILURE:
        return Object.assign({}, state, {
          payload: [],
          loading: false,
          errors: action.error,
        });
      case REDUCER_CLEAN_REQUEST:
        return Object.assign({}, state, {
          payload: [],
          loading: false,
          errors: {},
        });
      default:
        return state;
    }
  };
  
  export const storeByIdReducer = (state, action) => {
    state = state || INITIAL_STATE;
    switch (action?.type) {
      case FETCH_STORE_BY_ID:
        return Object.assign({}, state, {
          loading: true,
        });
      case FETCH_STORE_BY_ID_SUCCESS:
        return Object.assign({}, state, {
          payload: action?.data?.data,
          loading: false,
          errors: {},
        });
  
      case FETCH_STORE_BY_ID_FAILURE:
        return Object.assign({}, state, {
          payload: [],
          loading: false,
          errors: action.error,
        });
      case REDUCER_CLEAN_REQUEST:
        return Object.assign({}, state, {
          payload: [],
          loading: false,
          errors: {},
        });
      default:
        return state;
    }
  };
  