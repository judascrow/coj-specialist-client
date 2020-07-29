import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";

import theme from "./theme";
import PrivateRoute from "./components/routing/PrivateRoute";
import Login from "./components/auth/Login";
import AuthState from "./context/auth/AuthState";

const Home = () => <div>Home</div>;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthState>
        <Router>
          <Fragment>
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </Fragment>
        </Router>
      </AuthState>
    </ThemeProvider>
  );
};

export default App;
