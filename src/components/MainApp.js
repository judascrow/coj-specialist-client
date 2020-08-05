import React, { Fragment, useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PrivateRoute from "./routing/PrivateRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Alert from "./shared/Alert";
import Home from "./home/Home";
import User from "./users/Index";
import UserAdd from "./users/UserAdd";
import UserEdit from "./users/UserEdit";
import RequestForm from "./specialist/RequestForm";
import Specialists from "./specialist/Specialists";
import SpecialistForm from "./specialist/SpecialistForm";

import AuthContext from "../context/auth/authContext";
import UserState from "../context/users/UserState";

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
            <PrivateRoute exact path="/user/:slug/edit" component={UserEdit} />
            <PrivateRoute exact path="/specialist" component={Specialists} />
            <PrivateRoute exact path="/reqforms" component={RequestForm} />
            <PrivateRoute
              exact
              path="/reqform-add"
              component={SpecialistForm}
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </UserState>
      </Fragment>
    </Router>
  );
};

export default MainApp;
