import axios from "../../utils/api";

export const getAllSpecialists = () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.get(`/lists?isSpecialist=true`, config);
};
