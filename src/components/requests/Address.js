import axios from "../../utils/api";
import setAuthToken from "../../utils/setAuthToken";

export const getAllProvices = () => {
  setAuthToken(localStorage.token);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.get(`/provinces`, config);
};

export const getAllDistricts = (provinceID) => {
  setAuthToken(localStorage.token);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios.get(`/province/${provinceID}/districts`, config);
};

export const getAllSubDistricts = (provinceID, districtID) => {
  setAuthToken(localStorage.token);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios.get(
    `/province/${provinceID}/district/${districtID}/subDistricts`,
    config
  );
};

export const getProviceByID = (id) => {
  setAuthToken(localStorage.token);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.get(`/provinces/${id}`, config);
};

export const getDistrictByID = (id) => {
  setAuthToken(localStorage.token);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.get(`/districts/${id}`, config);
};

export const getSubDistrictByID = (id) => {
  setAuthToken(localStorage.token);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.get(`/subdistricts/${id}`, config);
};
