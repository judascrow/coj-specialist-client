import React, { useReducer } from "react";
import axios from "../../utils/api";
import SpecialistContext from "./specialistContext";
import specialistReducer from "./specialistReducer";
import setAuthToken from "../../utils/setAuthToken";
import {
  GET_SPECIALISTS,
  GET_SPECIALIST,
  ADD_SPECIALIST,
  DELETE_SPECIALIST,
  UPDATE_SPECIALIST,
  SPECIALIST_ERROR,
} from "../types";

const UserState = (props) => {
  const initialState = {
    specialists: [],
    specialistData: {},
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(specialistReducer, initialState);

  // Get Contacts
  const getSpecialists = async (params) => {
    setAuthToken(localStorage.token);

    try {
      const res = await axios.get(
        `/reqforms?pageSize=250&isSpecialist=${params.isSpecialist}`
      );
      dispatch({
        type: GET_SPECIALISTS,
        payload: res.data.data,
      });
    } catch (err) {
      const errMsg = err.response;
      dispatch({
        type: SPECIALIST_ERROR,
        payload: errMsg?.message,
      });
    }
  };

  const getSpecialist = async (id) => {
    setAuthToken(localStorage.token);

    try {
      const res = await axios.get(`/reqforms/${id}`);
      dispatch({
        type: GET_SPECIALIST,
        payload: res.data.data,
      });
    } catch (err) {
      const errMsg = err.response;
      dispatch({
        type: SPECIALIST_ERROR,
        payload: errMsg?.message,
      });
    }
  };

  // Add Contact
  const addSpecialist = async (specialist) => {
    setAuthToken(localStorage.token);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const res = await axios.post("/reqforms", specialist, config);

      dispatch({
        type: ADD_SPECIALIST,
        payload: res.data.data,
      });
    } catch (err) {
      const errMsg = err.response;
      dispatch({
        type: SPECIALIST_ERROR,
        payload: errMsg?.message,
      });
    }
  };

  // Delete Contact
  const deleteSpecialist = async (id) => {
    setAuthToken(localStorage.token);
    try {
      await axios.delete(`/reqforms/${id}`);

      dispatch({
        type: DELETE_SPECIALIST,
        payload: id,
      });
    } catch (err) {
      const errMsg = err.response;
      dispatch({
        type: SPECIALIST_ERROR,
        payload: errMsg?.message,
      });
    }
  };

  // Update Contact
  const updateSpecialist = async (id, data) => {
    setAuthToken(localStorage.token);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const res = await axios.put(`/reqforms/${id}`, data, config);

      dispatch({
        type: UPDATE_SPECIALIST,
        payload: res.data.data,
      });
    } catch (err) {
      const errMsg = err.response;
      dispatch({
        type: SPECIALIST_ERROR,
        payload: errMsg?.message,
      });
    }
  };

  return (
    <SpecialistContext.Provider
      value={{
        specialists: state.specialists,
        specialistData: state.specialistData,
        error: state.error,
        addSpecialist,
        deleteSpecialist,
        updateSpecialist,
        getSpecialists,
        getSpecialist,
      }}
    >
      {props.children}
    </SpecialistContext.Provider>
  );
};

export default UserState;
