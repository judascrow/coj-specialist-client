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
  span: {
    color: theme.palette.primary.dark,
    //fontWeight: "bold",
  },
  spanDanger: {
    color: theme.palette.secondary.main,
    //fontWeight: "bold",
  },
}));

const Home = () => {
  const classes = useStyles();

  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const { username, email, firstName, lastName, roleId, role, profile } = {
    username: user?.data?.username,
    email: user?.data?.email,
    firstName: user?.data?.firstName,
    lastName: user?.data?.lastName,
    roleId: user?.data?.roleId,
    role: user?.data?.role,
    profile: user?.data?.profile,
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
            <div>
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
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            {roleId === 3 ? (
              <div>
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  ข้อมูลผู้เชี่ยวชาญ
                </Typography>
                <Typography variant="body1" gutterBottom>
                  สถานะผู้เชี่ยวชาญ :{" "}
                  {profile?.isSpecialist ? (
                    <span>เป็นผู้เชี่ยวชาญ</span>
                  ) : (
                    <span className={classes.spanDanger}>
                      ยังไม่เป็นผู้เชี่ยวชาญ
                    </span>
                  )}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  สถานะการขึ้นทะเบียน :{" "}
                  {profile ? (
                    <span className={classes.span}>
                      {profile?.statusReqform === "checking"
                        ? "ส่งข้อมูลแล้ว รอการตรวจสอบ"
                        : ""}
                    </span>
                  ) : (
                    <span className={classes.spanDanger}>
                      ยังไม่ได้ยื่นคำขอขึ้นทะเบียน
                    </span>
                  )}
                </Typography>
              </div>
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
