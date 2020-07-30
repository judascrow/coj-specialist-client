import React, { Fragment, useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PrivateRoute from "./routing/PrivateRoute";
import Login from "./auth/Login";
import Alert from "./shared/Alert";
import AuthContext from "../context/auth/authContext";

import { makeStyles } from "@material-ui/core/styles";
import Navbar from "./layouts/Navbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
}));
const Home = () => {
  const classes = useStyles();

  return (
    <div>
      <Container fixed>
        <Paper elevation={3}>
          <Typography component="div" className={classes.root}>
            <h1>Hello Home</h1>
          </Typography>
        </Paper>
      </Container>
    </div>
  );
};

const User = () => {
  const classes = useStyles();
  return (
    <div>
      <Container fixed>
        <Paper elevation={3}>
          <Typography component="div" className={classes.root}>
            <h1>Hello User</h1>
          </Typography>
        </Paper>
      </Container>
    </div>
  );
};

const Specialist = () => {
  const classes = useStyles();
  return (
    <div>
      <Container fixed>
        <Paper elevation={3}>
          <Typography component="div" className={classes.root}>
            <h1>Hello Specialist</h1>
          </Typography>
        </Paper>
      </Container>
    </div>
  );
};

const MainApp = () => {
  const authContext = useContext(AuthContext);
  const { loadUser, isAuthenticated } = authContext;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [value, setValue] = useState(0);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Router>
      <Fragment>
        <Alert />
        {isAuthenticated ? (
          <div>
            <Navbar
              value={value}
              setValue={setValue}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
            />
            <CssBaseline />
          </div>
        ) : (
          ""
        )}
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/user" component={User} />
          <PrivateRoute exact path="/specialist" component={Specialist} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Fragment>
    </Router>
  );
};

export default MainApp;
