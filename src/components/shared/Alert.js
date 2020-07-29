import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";

import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

function AlertMui(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Alert = () => {
  const alertContext = useContext(AlertContext);

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert) => (
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={true}
        key={"topcenter"}
      >
        <AlertMui severity="error">{alert.msg}</AlertMui>
      </Snackbar>
    ))
  );
};

export default Alert;
