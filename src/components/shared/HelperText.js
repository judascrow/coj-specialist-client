import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.error.main,
  },
}));

const HelperText = (props) => {
  const classes = useStyles();
  const { children } = props;

  return <span className={classes.root}>{children}</span>;
};

export default HelperText;
