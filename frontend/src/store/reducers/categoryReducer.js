import {
  REDUCER_CLEAN_REQUEST,
  FETCH_CATEGORY_LIST,
  FETCH_CATEGORY_LIST_SUCCESS,
  FETCH_CATEGORY_LIST_FAILURE,
  FETCH_CATEGORY_BY_ID,
  FETCH_CATEGORY_BY_ID_SUCCESS,
  FETCH_CATEGORY_BY_ID_FAILURE,
  FETCH_SUB_CATEGORY_LIST,
  FETCH_SUB_CATEGORY_LIST_SUCCESS,
  FETCH_SUB_CATEGORY_LIST_FAILURE,
} from "../../constants/actionTypes";

const INITIAL_STATE = {
  payload: [],
  loading: true,
  errors: {},
};

/**
 * A reducer takes two arguments, the current state and an action.
 */
export const categoryListReducer = (state, action) => {
  state = state || INITIAL_STATE;
  switch (action?.type) {
    case FETCH_CATEGORY_LIST:
      return Object.assign({}, state, {
        loading: true,
      });
    case FETCH_CATEGORY_LIST_SUCCESS:
      return Object.assign({}, state, {
        payload: action?.data?.data,
        loading: false,
        errors: {},
      });

    case FETCH_CATEGORY_LIST_FAILURE:
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

export const categoryByIdReducer = (state, action) => {
  state = state || INITIAL_STATE;
  switch (action?.type) {
    case FETCH_CATEGORY_BY_ID:
      return Object.assign({}, state, {
        loading: true,
      });
    case FETCH_CATEGORY_BY_ID_SUCCESS:
      return Object.assign({}, state, {
        payload: action?.data?.data,
        loading: false,
        errors: {},
      });

    case FETCH_CATEGORY_BY_ID_FAILURE:
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

export const subCategoryListReducer = (state, action) => {
  state = state || INITIAL_STATE;
  switch (action?.type) {
    case FETCH_SUB_CATEGORY_LIST:
      return Object.assign({}, state, {
        loading: true,
      });
    case FETCH_SUB_CATEGORY_LIST_SUCCESS:
      return Object.assign({}, state, {
        payload: action?.data?.data,
        loading: false,
        errors: {},
      });

    case FETCH_SUB_CATEGORY_LIST_FAILURE:
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