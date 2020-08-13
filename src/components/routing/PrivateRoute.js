import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import Layout from "../layouts/Layout";
import AuthContext from "../../context/auth/authContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { loading, user } = authContext;
  return (
    <Route
      {...rest}
      render={(props) =>
        !user && !loading ? (
          <Redirect to="/login" />
        ) : (
          <Layout>
            <Component {...props} />
          </Layout>
        )
      }
    />
  );
};

export default PrivateRoute;
