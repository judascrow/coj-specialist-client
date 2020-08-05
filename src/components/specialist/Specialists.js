import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import SpecialistTable from "./SpecialistTable";
import SpecialistState from "../../context/specialist/SpecialistState";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

const Specialists = () => {
  const classes = useStyles();

  const params = {
    isSpecialist: true,
  };

  return (
    <div className={classes.root}>
      <SpecialistState>
        <SpecialistTable title="ผู้เชี่ยวชาญ" params={params} />
      </SpecialistState>
    </div>
  );
};

export default Specialists;
