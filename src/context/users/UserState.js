import React, { useReducer } from "react";
import axios from "../../utils/api";
import UserContext from "./userContext";
import userReducer from "./userReducer";
import setAuthToken from "../../utils/setAuthToken";
import {
  GET_USERS,
  GET_USER,
  ADD_USER,
  DELETE_USER,
  UPDATE_USER,
  USER_ERROR,
  CLEAR_CURRENT,
} from "../types";

const UserState = (props) => {
  const initialState = {
    users: [],
    userData: {},
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  // Get Contacts
  const getUsers = async () => {
    setAuthToken(localStorage.token);

    try {
      const res = await axios.get("/users?pageSize=250");
      dispatch({
        type: GET_USERS,
        payload: res.data.data,
      });
    } catch (err) {
      const errMsg = err.response;
      dispatch({
        type: USER_ERROR,
        payload: errMsg?.message,
      });
    }
  };

  const getUser = async (slug) => {
    setAuthToken(localStorage.token);

    try {
      const res = await axios.get(`/users/${slug}`);
      dispatch({
        type: GET_USER,
        payload: res.data.data,
      });
    } catch (err) {
      const errMsg = err.response;
      dispatch({
        type: USER_ERROR,
        payload: errMsg?.message,
      });
    }
  };

  // Add Contact
  const addUser = async (user) => {
    setAuthToken(localStorage.token);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/users", user, config);

      dispatch({
        type: ADD_USER,
        payload: res.data.data,
      });
    } catch (err) {
      const errMsg = err.response;
      dispatch({
        type: USER_ERROR,
        payload: errMsg?.message,
      });
    }
  };

  // Delete Contact
  const deleteUser = async (slug) => {
    try {
      await axios.delete(`/users/${slug}`);

      dispatch({
        type: DELETE_USER,
        payload: slug,
      });
    } catch (err) {
      const errMsg = err.response;
      dispatch({
        type: USER_ERROR,
        payload: errMsg?.message,
      });
    }
  };

  // Update Contact
  const updateUser = async (slug, data) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(`/users/${slug}`, data, config);

      dispatch({
        type: UPDATE_USER,
        payload: res.data.data,
      });
    } catch (err) {
      const errMsg = err.response;
      dispatch({
        type: USER_ERROR,
        payload: errMsg?.message,
      });
    }
  };

  // Clear Current Contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  return (
    <UserContext.Provider
      value={{
        users: state.users,
        userData: state.userData,
        error: state.error,
        addUser,
        deleteUser,
        updateUser,
        getUsers,
        getUser,
        clearCurrent,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
