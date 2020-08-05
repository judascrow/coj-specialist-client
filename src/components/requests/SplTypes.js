import axios from "../../utils/api";
import setAuthToken from "../../utils/setAuthToken";

export const getAllSplTypes = () => {
  setAuthToken(localStorage.token);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.get(`/spltypes`, config);
};

export const getAllSplSubTypes = (splTypeID) => {
  setAuthToken(localStorage.token);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios.get(`/spltypes/${splTypeID}/splsubtypes`, config);
};
