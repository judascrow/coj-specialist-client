import {
  GET_USERS,
  ADD_USER,
  DELETE_USER,
  UPDATE_USER,
  USER_ERROR,
  CLEAR_USERS,
} from "../types";

export default (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case GET_USERS:
      return {
        ...state,
        users: payload,
        loading: false,
      };
    case ADD_USER:
      return {
        ...state,
        users: [payload, ...state.users],
        loading: false,
      };
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === payload._id ? payload : user
        ),
        loading: false,
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.slug !== payload),
        loading: false,
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: null,
        filtered: null,
        error: null,
        current: null,
      };
    case USER_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
