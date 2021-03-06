const INITIAL_STATE = {
  payload: [],
  loading: false,
  errors: {},
  pagination: {},
}

/**
 * A reducer takes two arguments, the current state and an action.
 */
export const headingReducer = (state, action) => {
  state = state || INITIAL_STATE
  switch (action?.type) {
    case "HEADING":
      return Object.assign({}, state, {
        payload: action?.data,
      })
    default:
      return state
  }
}
