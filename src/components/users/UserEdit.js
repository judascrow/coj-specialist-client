import React, { Fragment, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

import TextFieldCT from "../shared/TextFieldCT";
import HelperText from "../shared/HelperText";

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
  title: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
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

const UserEdit = (props) => {
  const classes = useStyles();
  const userContext = useContext(UserContext);

  const { history, match } = props;
  const slug = match.params.slug;

  const { getUser, updateUser, userData } = userContext;
  const { register, handleSubmit, errors, control } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const setUserData = async () => {
    await getUser(slug);
    // setA(true);
  };

  useEffect(() => {
    setUserData();
    // eslint-disable-next-line
  }, []);

  const onSubmit = async (data) => {
    data.roleId = data.roleId?.value;
    data.status = data.status?.value;
    await updateUser(slug, data);
    await history.push("/user");
  };

  return (
    <Fragment>
      <div className={classes.root}>
        <Typography variant="h5" gutterBottom>
          แก้ไขผู้ใช้งาน :{" "}
          <span className={classes.title}>{userData?.username}</span>
        </Typography>
        <Divider className={classes.divider} />
        <form onSubmit={handleSubmit(onSubmit)}>
          {userData?.slug === slug ? (
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12}>
                <TextFieldCT
                  label="Email"
                  name="email"
                  margin="dense"
                  defaultValue={userData?.email}
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
                  defaultValue={userData?.firstName}
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
                  defaultValue={userData?.lastName}
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
                    userData?.roleId
                      ? roleOptionsList.find(
                          (s) => s.value === userData?.roleId
                        )
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
                    userData?.status
                      ? statusOptionsList.find(
                          (s) => s.value === userData?.status
                        )
                      : statusOptionsList[0]
                  }
                  inputRef={register({ required: true })}
                />
              </Grid>
              <Grid item xs={12}>
                <div className={classes.buttons}>
                  <Button
                    component={Link}
                    to="/user"
                    className={classes.button}
                  >
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
          ) : (
            <CircularProgress
              style={{
                margin: "auto",
                display: "block",
              }}
            />
          )}
        </form>
      </div>
    </Fragment>
  );
};

export default UserEdit;
