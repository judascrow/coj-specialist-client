import React, { Fragment, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

import AuthContext from "../../context/auth/authContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(3),
    padding: theme.spacing(3),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
}));

const Home = () => {
  const classes = useStyles();

  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const { username, email, firstName, lastName, roleId, role } = {
    username: user?.data?.username,
    email: user?.data?.email,
    firstName: user?.data?.firstName,
    lastName: user?.data?.lastName,
    roleId: user?.data?.roleId,
    role: user?.data?.role,
  };

  return (
    <Fragment>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              สวัสดีคุณ {user?.data?.firstName + " " + user?.data?.lastName}
            </Typography>
            <Divider className={classes.divider} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="primary" gutterBottom>
              ข้อมูลทั่วไป
            </Typography>
            <Typography variant="body1" gutterBottom>
              ชื่อผู้ใช้งาน : {username}
            </Typography>
            <Typography variant="body1" gutterBottom>
              สิทธิ์การใช้งาน : {role?.nameTh}
            </Typography>
            <Typography variant="body1" gutterBottom>
              ชื่อ-สกุล : {firstName + " " + lastName}
            </Typography>
            <Typography variant="body1" gutterBottom>
              อีเมล์ : {email}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            {roleId === 3 ? (
              <Typography variant="subtitle2" gutterBottom>
                ข้อมูลผู้เชี่ยวชาญ
              </Typography>
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
};

export default Home;
