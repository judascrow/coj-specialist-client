import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";

import UsersTable from "./UsersTable";
import UserState from "../../context/users/UserState";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  titleIcon: {
    verticalAlign: "middle",
    margin: theme.spacing(1),
  },
  fab: {
    position: "fixed",
    zIndex: 1000,
    bottom: theme.spacing(3),
    right: theme.spacing(3),
    backgroundColor: theme.palette.success.main,
    color: "#fff",
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
    },
  },
}));

const UserIndex = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <UserState>
        <UsersTable />
        <Tooltip title="เพิ่มผู้ใช้งาน" aria-label="Add">
          <Fab component={Link} to="/" aria-label="Add" className={classes.fab}>
            <AddIcon />
          </Fab>
        </Tooltip>
      </UserState>
    </div>
  );
};

export default UserIndex;
