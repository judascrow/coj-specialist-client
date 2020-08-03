import React, { useReducer } from "react";
import axios from "../../utils/api";
import UserContext from "./userContext";
import userReducer from "./userReducer";
import setAuthToken from "../../utils/setAuthToken";
import {
  GET_USERS,
  ADD_USER,
  DELETE_USER,
  UPDATE_USER,
  USER_ERROR,
} from "../types";

const UserState = (props) => {
  const initialState = {
    users: [],
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  // Get Contacts
  const getUsers = async () => {
    setAuthToken(localStorage.token);

    try {
      const res = await axios.get("/users");
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
  const updateUser = async (contact) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );

      dispatch({
        type: UPDATE_USER,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response.msg,
      });
    }
  };

  return (
    <UserContext.Provider
      value={{
        users: state.users,
        error: state.error,
        addUser,
        deleteUser,
        updateUser,
        getUsers,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
