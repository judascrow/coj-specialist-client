import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { useForm } from "react-hook-form";

import TextFieldCT from "../shared/TextFieldCT";
import HelperText from "../shared/HelperText";
import logo from "../../assets/images/logo.svg";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Typography component={Link} color="inherit" to="https://www.coj.go.th/">
        Court of Justice
      </Typography>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  logo: {
    margin: theme.spacing(1),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
    if (error) {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    login(data);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img alt="company logo" className={classes.logo} src={logo} />
        <Typography component="h1" variant="h5">
          ระบบผู้เชี่ยวชาญ
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextFieldCT
            autoFocus
            label="Username"
            name="username"
            autoComplete="username"
            inputRef={register({ required: true })}
            error={!!errors.username}
            helperText={
              errors.username && (
                <HelperText>This field is required.</HelperText>
              )
            }
          />

          <TextFieldCT
            type="password"
            label="Password"
            name="password"
            inputRef={register({ required: true })}
            error={!!errors.password}
            helperText={
              errors.password && (
                <HelperText>This field is required.</HelperText>
              )
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            เข้าสู่ระบบ
          </Button>
          <Grid container>
            <Grid item xs>
              <Typography component={Link} to="/list" variant="body2">
                {"รายชื่อผู้เชี่ยวชาญ"}
              </Typography>
            </Grid>
            <Grid item>
              <Typography component={Link} to="/register" variant="body2">
                {"ลงทะเบียน"}
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Login;
