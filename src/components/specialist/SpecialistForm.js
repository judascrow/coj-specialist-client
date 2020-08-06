import React, { Fragment, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import RequestFormAdd from "./RequestFormAdd";
import AuthContext from "../../context/auth/authContext";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  typography: {
    color: theme.palette.success.main,
    margin: theme.spacing(3),
    padding: theme.spacing(3),
  },
}));

const SpecialistForm = () => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  return (
    <Fragment>
      <div className={classes.root}>
        {user?.data?.profile === null ? (
          <RequestFormAdd
            title="ส่งคำขอขึ้นทะเบียนเป็นผู้เชี่ยวชาญฯ"
            edit={false}
          />
        ) : (
          <Typography variant="h5" className={classes.typography} gutterBottom>
            ท่านได้ส่งคำขอขึ้นทะเบียนเป็นผู้เชี่ยวชาญของศาลยุติธรรมแล้ว
            กรุณารอการตรวจสอบจากเจ้าหน้าที่
          </Typography>
        )}
      </div>
    </Fragment>
  );
};

export default SpecialistForm;
