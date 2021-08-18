import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  CssBaseline,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import logo from "../../assets/images/logo.svg";
import { getAllSpecialists } from "../requests/Lists";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  logo: {
    margin: theme.spacing(1),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function List() {
  const classes = useStyles();
  const [SpecialistsData, setSpecialistsData] = useState([]);
  useEffect(() => {
    loadAllSpecialists();
    // eslint-disable-next-line
  }, []);

  const loadAllSpecialists = async () => {
    const result = await getAllSpecialists();

    if (result && result.data.data !== undefined) {
      setSpecialistsData(result.data.data);
    }
  };

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div className={classes.paper}>
        <Link to="/">
          <img alt="company logo" className={classes.logo} src={logo} />
        </Link>
        <Typography component="h1" variant="h5">
          รายชื่อผู้เชี่ยวชาญ สำนักงานศาลยุติธรรม
        </Typography>
        <br />
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ชื่อ</TableCell>
                <TableCell>นามสกุล</TableCell>
                <TableCell>อีเมล์</TableCell>
                <TableCell>ผู้เชี่ยวชาญด้าน</TableCell>
                <TableCell>สาขา</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {SpecialistsData.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.firstName}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.lastName}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.email}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.SplType}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.SplSubType}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Container>
  );
}

export default List;
