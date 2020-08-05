import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import RequestFormAdd from "./RequestFormAdd";
import SpecialistState from "../../context/specialist/SpecialistState";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

const SpecialistForm = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <SpecialistState>
        <RequestFormAdd />
      </SpecialistState>
    </div>
  );
};

export default SpecialistForm;
