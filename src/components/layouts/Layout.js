import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import Navbar from "./Navbar";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
}));

const Layout = (props) => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [value, setValue] = useState(0);

  return (
    <div>
      <Navbar
        value={value}
        setValue={setValue}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
      <CssBaseline />
      <Container fixed>
        <Paper elevation={3}>
          <Typography component="div" className={classes.root}>
            {props.children}
          </Typography>
        </Paper>
      </Container>
    </div>
  );
};

export default Layout;
