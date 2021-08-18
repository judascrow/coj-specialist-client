import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
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

const Register = (props) => {
  const classes = useStyles();
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { error, clearErrors, isAuthenticated } = authContext;

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
    console.log(data);
    authContext.register(data);
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
            helperText={[
              errors.username?.type === "required" && (
                <HelperText key={1}>This field is required.</HelperText>
              ),
              errors.username?.type === "minLength" && (
                <HelperText key={2}>ต้องมีอย่างน้อย 6 ตัวอักษร</HelperText>
              ),
              errors.username?.type === "maxLength" && (
                <HelperText key={3}>ต้องมีไม่เกิน 20 ตัวอักษร</HelperText>
              ),
            ]}
          />
          <TextFieldCT
            type="password"
            label="Password"
            name="password"
            inputRef={register({
              required: true,
              minLength: 6,
              maxLength: 20,
            })}
            error={!!errors.password}
            helperText={[
              errors.password?.type === "required" && (
                <HelperText key={1}>This field is required.</HelperText>
              ),
              errors.password?.type === "minLength" && (
                <HelperText key={2}>ต้องมีอย่างน้อย 6 ตัวอักษร</HelperText>
              ),
              errors.password?.type === "maxLength" && (
                <HelperText key={3}>ต้องมีไม่เกิน 20 ตัวอักษร</HelperText>
              ),
            ]}
          />
          <TextFieldCT
            label="Email"
            name="email"
            autoComplete="email"
            inputRef={register({
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              required: true,
            })}
            error={!!errors.email}
            helperText={[
              errors.email?.type === "required" && (
                <HelperText key={1}>This field is required.</HelperText>
              ),
              errors.email?.type === "pattern" && (
                <HelperText key={2}>รูปแบบ Email ไม่ถูกต้อง</HelperText>
              ),
            ]}
          />
          <TextFieldCT
            label="ชื่อ"
            name="firstName"
            autoComplete="firstName"
            inputRef={register({ required: true })}
            error={!!errors.firstName}
            helperText={
              errors.firstName && (
                <HelperText>This field is required.</HelperText>
              )
            }
          />
          <TextFieldCT
            label="นามสกุล"
            name="lastName"
            autoComplete="lastName"
            inputRef={register({ required: true })}
            error={!!errors.lastName}
            helperText={
              errors.lastName && (
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
            ลงทะเบียน
          </Button>
          <Grid container>
            <Grid item xs>
              <Typography component={Link} to="#" variant="body2">
                {/* ลืมรหัสผ่าน? */}
              </Typography>
            </Grid>
            <Grid item>
              <Typography component={Link} to="/login" variant="body2">
                {"เข้าสู่ระบบ"}
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

export default Register;
