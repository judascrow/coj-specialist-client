import { useContext } from "react";
import axios from "axios";
import AuthContext from "../context/auth/authContext";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});
/**
 intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired
 logout the user if the token has expired
**/

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.data.msg === "Token is not valid") {
      const authContext = useContext(AuthContext);
      const { logout } = authContext;
      logout();
    }
    return Promise.reject(err);
  }
);

export default api;
