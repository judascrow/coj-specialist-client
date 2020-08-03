import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

import TextFieldCT from "../shared/TextFieldCT";
import HelperText from "../shared/HelperText";

import AuthContext from "../../context/auth/authContext";
import UserContext from "../../context/users/userContext";

// Role Options
const roleOptionsList = [
  { value: 3, label: "สิทธิ์การใช้งาน User - ผู้ใช้งานทั่วไป" },
  { value: 2, label: "สิทธิ์การใช้งาน Staff - เจ้าหน้าที่" },
  { value: 1, label: "สิทธิ์การใช้งาน Admin - ผู้ดูแลระบบ" },
];

// Status Options
const statusOptionsList = [
  { value: "A", label: "สถานะ Active - เปิดใช้งาน" },
  { value: "I", label: "สถานะ Inactive - ปิดใช้งาน" },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(3),
    padding: theme.spacing(3),
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const UserAdd = (props) => {
  const classes = useStyles();

  const { history } = props;

  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const userContext = useContext(UserContext);
  const { addUser } = userContext;

  const { register, handleSubmit, errors, control } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data) => {
    data.roleId = data.roleId?.value;
    data.status = data.status?.value;
    console.log(data);
    await addUser(data);
    await history.push("/user");
  };

  return (
    <Fragment>
      <div className={classes.root}>
        <Typography variant="h5" gutterBottom>
          เพิ่มผู้ใช้งาน
        </Typography>
        <Divider className={classes.divider} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextFieldCT
                autoFocus
                label="Username"
                name="username"
                autoComplete="username"
                margin="dense"
                error={!!errors.username}
                inputRef={register({
                  required: true,
                  minLength: 6,
                  maxLength: 50,
                })}
                helperText={[
                  errors.username?.type === "required" && (
                    <HelperText key={1}>This field is required.</HelperText>
                  ),
                  errors.username?.type === "minLength" && (
                    <HelperText key={2}>ต้องมีอย่างน้อย 6 ตัวอักษร</HelperText>
                  ),
                  errors.username?.type === "maxLength" && (
                    <HelperText key={3}>ต้องมีไม่เกิน 20 ตัวอักษร</HelperText>
                  ),
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldCT
                type="password"
                label="Password"
                name="password"
                margin="dense"
                error={!!errors.password}
                inputRef={register({
                  required: true,
                  minLength: 6,
                  maxLength: 50,
                })}
                helperText={[
                  errors.password?.type === "required" && (
                    <HelperText key={1}>This field is required.</HelperText>
                  ),
                  errors.password?.type === "minLength" && (
                    <HelperText key={2}>ต้องมีอย่างน้อย 6 ตัวอักษร</HelperText>
                  ),
                  errors.password?.type === "maxLength" && (
                    <HelperText key={3}>ต้องมีไม่เกิน 20 ตัวอักษร</HelperText>
                  ),
                ]}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextFieldCT
                label="Email"
                name="email"
                margin="dense"
                error={!!errors.email}
                inputRef={register({
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  required: true,
                })}
                helperText={[
                  errors.email?.type === "required" && (
                    <HelperText key={1}>This field is required.</HelperText>
                  ),
                  errors.email?.type === "pattern" && (
                    <HelperText key={2}>รูปแบบ Email ไม่ถูกต้อง</HelperText>
                  ),
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldCT
                label="ชื่อ"
                name="firstName"
                margin="dense"
                error={!!errors.firstName}
                inputRef={register({ required: true })}
                helperText={[
                  errors.firstName?.type === "required" && (
                    <HelperText key={1}>This field is required.</HelperText>
                  ),
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldCT
                label="นามสกุล"
                name="lastName"
                margin="dense"
                error={!!errors.lastName}
                inputRef={register({ required: true })}
                helperText={[
                  errors.lastName?.type === "required" && (
                    <HelperText key={1}>This field is required.</HelperText>
                  ),
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={6} style={{ marginTop: "8px" }}>
              <Controller
                as={Select}
                control={control}
                options={roleOptionsList}
                reactSelectID={"roleId"}
                name={"roleId"}
                labelName={"สิทธิ์การใช้งาน"}
                onChange={([selected]) => {
                  return selected?.value;
                }}
                defaultValue={
                  user?.roleId
                    ? roleOptionsList.find((s) => s.value === user?.roleId)
                    : roleOptionsList[0]
                }
                inputRef={register({ required: true })}
              />
            </Grid>
            <Grid item xs={12} sm={6} style={{ marginTop: "8px" }}>
              <Controller
                as={Select}
                control={control}
                options={statusOptionsList}
                reactSelectID={"status"}
                name={"status"}
                labelName={"สถานะ"}
                onChange={([selected]) => {
                  return selected?.value;
                }}
                defaultValue={
                  user?.status
                    ? statusOptionsList.find((s) => s.value === user?.status)
                    : statusOptionsList[0]
                }
                inputRef={register({ required: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <div className={classes.buttons}>
                <Button component={Link} to="/user" className={classes.button}>
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  {"บันทึกข้อมูล"}
                </Button>
              </div>
            </Grid>
          </Grid>
        </form>
      </div>
    </Fragment>
  );
};

export default UserAdd;
