import React, { useContext, useEffect, useState } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Chip from "@material-ui/core/Chip";
import PeopleIcon from "@material-ui/icons/People";

import UserContext from "../../context/users/userContext";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "18px",
  },
  titleIcon: {
    verticalAlign: "middle",
    margin: theme.spacing(1),
  },
  chip: {
    color: theme.palette.success.main,
    borderColor: theme.palette.success.main,
  },
}));

const UsersTable = () => {
  const classes = useStyles();
  const userContext = useContext(UserContext);
  const { users, getUsers, loading, deleteUser } = userContext;

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);

  const onEdit = (rowData) => {};

  const onDelete = (rowData) => {
    deleteUser(rowData.slug);
  };

  const [columns] = useState([
    { title: "ชื่อผู้ใช้งาน", field: "username" },
    {
      title: "ชื่อ - นามสกุล",
      field: "first_name",
      render: (rowData) => rowData.firstName + " " + rowData.lastName,
    },
    {
      title: "อีเมล์",
      field: "email",
    },
    {
      title: "สิทธิ์การใช้งาน",
      field: "roleId",
      render: (rowData) => {
        const name = rowData.role.nameTh;
        switch (rowData.role.name) {
          case "admin":
            return (
              <Chip
                variant="outlined"
                label={name}
                color="primary"
                size="small"
              />
            );
          case "staff":
            return (
              <Chip
                variant="outlined"
                label={name}
                color="secondary"
                size="small"
              />
            );
          default:
            return <Chip variant="outlined" label={name} size="small" />;
        }
      },
    },
    {
      title: "สถานะ",
      field: "status",
      render: (rowData) =>
        rowData.status === "A" ? (
          <Chip
            label="Active"
            size="small"
            variant="outlined"
            className={classes.chip}
          />
        ) : (
          <Chip label="Inactive" size="small" variant="outlined" />
        ),
    },
  ]);

  const [actions] = useState([
    {
      icon: "edit",
      iconProps: { color: "primary" },
      tooltip: "แก้ไขผู้ใช้งาน",
      onClick: (event, rowData) => onEdit(rowData),
    },
    (rowData) => ({
      icon: "delete",
      iconProps: { color: "error" },
      tooltip: "ลบผู้ใช้งาน",
      onClick: (event, rowData) =>
        window.confirm("Are you sure you wish to delete this item?") &&
        onDelete(rowData),
    }),
  ]);

  const [options] = useState({
    showTitle: true,
    actionsColumnIndex: -1,
    pageSize: 10,
    headerStyle: {
      backgroundColor: "#039be5",
      color: "#fff",
    },
    rowStyle: (rowData) => ({
      backgroundColor: rowData.tableData.id % 2 === 1 ? "#EEE" : "#FFF",
    }),
    padding: "dense",
  });

  const TableTitle = (
    <div className={classes.title}>
      <PeopleIcon className={classes.titleIcon} fontSize="large" />
      <b>{"ผู้ใช้งาน"}</b>
    </div>
  );

  return (
    <div>
      {" "}
      {users && !loading ? (
        <MaterialTable
          columns={columns}
          data={users}
          actions={actions}
          options={options}
          title={TableTitle}
        />
      ) : (
        <CircularProgress style={{ margin: "auto", display: "block" }} />
      )}
    </div>
  );
};

export default UsersTable;
