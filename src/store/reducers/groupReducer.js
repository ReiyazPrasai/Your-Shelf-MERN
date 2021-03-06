import {
  REDUCER_CLEAN_REQUEST,
  FETCH_GROUP_LIST,
  FETCH_GROUP_LIST_SUCCESS,
  FETCH_GROUP_LIST_FAILURE,
  FETCH_GROUP_BY_ID,
  FETCH_GROUP_BY_ID_SUCCESS,
  FETCH_GROUP_BY_ID_FAILURE,
} from "../../constants/actionTypes";

const INITIAL_STATE = {
  payload: [],
  loading: false,
  errors: {},
};

/**
 * A reducer takes two arguments, the current state and an action.
 */
export const groupListReducer = (state, action) => {
  state = state || INITIAL_STATE;
  switch (action?.type) {
    case FETCH_GROUP_LIST:
      return Object.assign({}, state, {
        loading: true,
      });
    case FETCH_GROUP_LIST_SUCCESS:
      return Object.assign({}, state, {
        payload: action?.data?.data,
        loading: false,
        errors: {},
      });

    case FETCH_GROUP_LIST_FAILURE:
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

export const groupByIdReducer = (state, action) => {
  state = state || INITIAL_STATE;
  switch (action?.type) {
    case FETCH_GROUP_BY_ID:
      return Object.assign({}, state, {
        loading: true,
      });
    case FETCH_GROUP_BY_ID_SUCCESS:
      return Object.assign({}, state, {
        payload: action?.data?.data,
        loading: false,
        errors: {},
      });

    case FETCH_GROUP_BY_ID_FAILURE:
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
