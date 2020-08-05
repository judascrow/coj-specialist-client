import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import "moment/locale/th";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Chip from "@material-ui/core/Chip";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

import SpecialistContext from "../../context/specialist/specialistContext";

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

const SpecialistTable = (props) => {
  const classes = useStyles();
  const { title, params } = props;
  let history = useHistory();
  const specialistContext = useContext(SpecialistContext);
  const {
    specialists,
    getSpecialists,
    loading,
    deleteSpecialist,
  } = specialistContext;

  useEffect(() => {
    getSpecialists(params);
    // eslint-disable-next-line
  }, []);

  const onEdit = (rowData) => {
    history.push(`/reqforms/${rowData.id}/edit`);
  };

  const onDelete = (rowData) => {
    deleteSpecialist(rowData.id);
  };

  const [columns] = useState([
    { title: "เลขบัตร ปชช.", field: "idCard" },
    {
      title: "ชื่อ - นามสกุล",
      field: "first_name",
      render: (rowData) =>
        rowData.prefixName + rowData.firstName + " " + rowData.lastName,
    },
    {
      title: "วันที่ส่งคำขอฯ",
      field: "CreatedAt",
      render: (rowData) => moment(rowData.CreatedAt).locale("th").format("lll"),
    },
    {
      title: "ผู้เชี่ยวชาญ",
      field: "isSpecialist",
      render: (rowData) =>
        rowData.isSpecialist === true ? (
          <Chip
            label="เป็นผู้เชี่ยวชาญ"
            size="small"
            className={classes.chip}
          />
        ) : (
          <Chip label="ยังไม่เป็นผู้เชี่ยวชาญ" size="small" />
        ),
    },
    {
      title: "คำขอขึ้นทะเบียน",
      field: "statusReqform",
      render: (rowData) =>
        rowData.statusReqform === "" ? (
          <Chip label="อนุมัติ" size="small" className={classes.chip} />
        ) : (
          <Chip label="ยื่นเอกสารแล้ว" size="small" />
        ),
    },
  ]);

  const [actions] = useState([
    {
      icon: "edit",
      iconProps: { color: "primary" },
      tooltip: "แก้ไขข้อมูล",
      onClick: (event, rowData) => onEdit(rowData),
    },
    (rowData) => ({
      icon: "delete",
      iconProps: { color: "error" },
      tooltip: "ลบข้อมูล",
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
      <AccountBoxIcon className={classes.titleIcon} fontSize="large" />
      <b>{title}</b>
    </div>
  );

  return (
    <div>
      {" "}
      {specialists && !loading ? (
        <MaterialTable
          columns={columns}
          data={specialists}
          actions={actions}
          options={options}
          title={TableTitle}
        />
      ) : (
        <CircularProgress
          style={{
            margin: "auto",
            display: "block",
          }}
        />
      )}
    </div>
  );
};

export default SpecialistTable;
