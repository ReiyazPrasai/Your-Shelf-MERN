import {
  REDUCER_CLEAN_REQUEST,
  FETCH_USER_LIST,
  FETCH_USER_LIST_SUCCESS,
  FETCH_USER_LIST_FAILURE,
  FETCH_USER_BY_ID,
  FETCH_USER_BY_ID_SUCCESS,
  FETCH_USER_BY_ID_FAILURE,
  FETCH_USER_INFO,
  CLEAN_USER_INFO,
} from "../../constants/actionTypes";

const INITIAL_STATE = {
  payload: [],
  loading: false,
  errors: {},
};

/**
 * A reducer takes two arguments, the current state and an action.
 */
export const userListReducer = (state, action) => {
  state = state || INITIAL_STATE;
  switch (action?.type) {
    case FETCH_USER_LIST:
      return Object.assign({}, state, {
        loading: true,
      });
    case FETCH_USER_LIST_SUCCESS:
      return Object.assign({}, state, {
        payload: action?.data?.data,
        loading: false,
        errors: {},
      });

    case FETCH_USER_LIST_FAILURE:
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

export const userInfoReducer = (state, action) => {
  state = state || INITIAL_STATE;
  switch (action?.type) {
    case FETCH_USER_INFO:
      return Object.assign({}, state, {
        payload: action?.data,
      });
    case CLEAN_USER_INFO:
      return Object.assign({}, state, {
        payload: [],
        loading: false,
        errors: {},
      });

    default:
      return state;
  }
};

export const userByIdReducer = (state, action) => {
  state = state || INITIAL_STATE;
  switch (action?.type) {
    case FETCH_USER_BY_ID:
      return Object.assign({}, state, {
        loading: true,
      });
    case FETCH_USER_BY_ID_SUCCESS:
      return Object.assign({}, state, {
        payload: action?.data?.data,
        loading: false,
        errors: {},
      });

    case FETCH_USER_BY_ID_FAILURE:
      return Object.assign({}, state, {
        payload: [],
        loading: false,
        errors: action.error,
      });

    default:
      return state;
  }
};
