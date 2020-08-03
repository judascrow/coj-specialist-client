import React, { Fragment, useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PrivateRoute from "./routing/PrivateRoute";
import Login from "./auth/Login";
import Alert from "./shared/Alert";
import AuthContext from "../context/auth/authContext";
import UserState from "../context/users/UserState";

import Home from "./home/Home";
import User from "./users/Index";
import UserAdd from "./users/UserAdd";

const Specialist = () => {
  return (
    <div>
      <h1>Hello Specialist</h1>
    </div>
  );
};

const MainApp = () => {
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Router>
      <Fragment>
        <Alert />
        <UserState>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/user" component={User} />
            <PrivateRoute exact path="/user/add" component={UserAdd} />
            <PrivateRoute exact path="/specialist" component={Specialist} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </UserState>
      </Fragment>
    </Router>
  );
};

export default MainApp;
