import {
  GET_USERS,
  GET_USER,
  ADD_USER,
  DELETE_USER,
  UPDATE_USER,
  USER_ERROR,
  CLEAR_USERS,
  CLEAR_CURRENT,
} from "../types";

export default (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case GET_USERS:
      return {
        ...state,
        users: payload,
        loading: false,
        userData: {},
      };
    case ADD_USER:
      return {
        ...state,
        users: [payload, ...state.users],
        loading: false,
      };
    case GET_USER:
      return {
        ...state,
        userData: payload,
        loading: false,
      };
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user.slug === payload.slug ? payload : user
        ),
        userData: payload,
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
    case CLEAR_CURRENT:
      return {
        ...state,
        userData: null,
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
