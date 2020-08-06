import {
  GET_SPECIALISTS,
  GET_SPECIALIST,
  ADD_SPECIALIST,
  DELETE_SPECIALIST,
  UPDATE_SPECIALIST,
  SPECIALIST_ERROR,
  CLEAR_SPECIALISTS,
} from "../types";

export default (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case GET_SPECIALISTS:
      return {
        ...state,
        specialists: payload,
        loading: false,
        specialistData: {},
      };
    case ADD_SPECIALIST:
      return {
        ...state,
        specialists: [payload, ...state.specialists],
        loading: false,
      };
    case GET_SPECIALIST:
      return {
        ...state,
        specialistData: payload,
        loading: false,
      };
    case UPDATE_SPECIALIST:
      return {
        ...state,
        specialists: state.specialists.map((specialist) =>
          specialist.id === payload.id ? payload : specialist
        ),
        specialistData: payload,
        loading: false,
      };
    case DELETE_SPECIALIST:
      return {
        ...state,
        specialists: state.specialists.filter(
          (specialist) => specialist.id !== payload
        ),
        loading: false,
      };
    case CLEAR_SPECIALISTS:
      return {
        ...state,
        specialists: null,
        filtered: null,
        error: null,
        current: null,
      };
    case SPECIALIST_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
