import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/th";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

import { useForm, Controller } from "react-hook-form";

import TextFieldCT from "../shared/TextFieldCT";
import HelperText from "../shared/HelperText";

import AuthContext from "../../context/auth/authContext";
import SpecialistContext from "../../context/specialist/specialistContext";

import ProvinceSelectOptions from "../address/ProvinceSelectOptions";
import DistrictSelectOptions from "../address/DistrictSelectOptions";

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

const RequestFormAdd = (props) => {
  const classes = useStyles();

  const { history } = props;

  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const specialistContext = useContext(SpecialistContext);
  const { addSpecialist } = specialistContext;

  const { register, handleSubmit, errors, control, watch, setValue } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const watchDomicileProvince = watch("domicileProvince");
  const watchDomicilDistrict = watch("domicileDistrict");

  console.log(watchDomicileProvince);
  //   const watchAddressProvince = watch("addressProvince");
  //   const watchAddressDistrict = watch("addressDistrict");
  //   const watchContactProvince = watch("contactProvince");
  //   const watchContactDistrict = watch("contactDistrict");

  const onSubmit = async (data) => {
    data.roleId = data.roleId?.value;
    data.status = data.status?.value;
    console.log(data);
    await addSpecialist(data);
    await history.push("/");
  };

  return (
    <Fragment>
      <div className={classes.root}>
        <Typography variant="h5" color="primary" gutterBottom>
          ส่งคำขอขึ้นทะเบียนเป็นผู้เชี่ยวชาญฯ
        </Typography>
        <Divider className={classes.divider} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h6" color="secondary" gutterBottom>
            ข้อมูลส่วนตัว
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={4}>
              <TextFieldCT
                autoFocus
                label="เลขบัตรประจำตัวประชาชน"
                name="idCard"
                autoComplete="idCard"
                margin="dense"
                error={!!errors.idCard}
                inputRef={register({
                  //required: true,
                  pattern: /[0-9]{13}/,
                  minLength: 13,
                  maxLength: 13,
                })}
                helperText={[
                  errors.idCard?.type === "required" && (
                    <HelperText key={1}>This field is required.</HelperText>
                  ),
                  errors.idCard?.type === "pattern" && (
                    <HelperText key={2}>
                      รูปแบบเลขบัตรประจำตัวประชาชนไม่ถูกต้อง
                    </HelperText>
                  ),
                  errors.idCard?.type === "minLength" && (
                    <HelperText key={3}>ต้องมี 13 ตัวอักษร</HelperText>
                  ),
                  errors.idCard?.type === "maxLength" && (
                    <HelperText key={4}>ต้องมี 13 ตัวอักษร</HelperText>
                  ),
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextFieldCT
                name="govCard"
                label="เลขบัตรประจำตัวข้าราชการ"
                margin="dense"
                inputRef={register}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextFieldCT
                type="date"
                name="cardExpire"
                label="บัตรหมดอายุ"
                margin="dense"
                defaultValue={
                  user?.data?.cardExpire
                    ? moment(user?.data?.cardExpire).format("YYYY-MM-DD")
                    : null
                }
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.cardExpire}
                inputRef={register({
                  //required: true,
                })}
                helperText={[
                  errors.idCard?.type === "required" && (
                    <HelperText key={1}>This field is required.</HelperText>
                  ),
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextFieldCT
                label="คำนำหน้าชื่อ"
                name="prefixName"
                margin="dense"
                error={!!errors.prefixName}
                inputRef={register({ required: true })}
                helperText={[
                  errors.prefixName?.type === "required" && (
                    <HelperText key={1}>This field is required.</HelperText>
                  ),
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextFieldCT
                label="ชื่อ"
                name="firstName"
                margin="dense"
                defaultValue={user?.data?.firstName}
                error={!!errors.firstName}
                inputRef={register({ required: true })}
                helperText={[
                  errors.firstName?.type === "required" && (
                    <HelperText key={1}>This field is required.</HelperText>
                  ),
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextFieldCT
                label="นามสกุล"
                name="lastName"
                margin="dense"
                defaultValue={user?.data?.lastName}
                error={!!errors.lastName}
                inputRef={register({ required: true })}
                helperText={[
                  errors.lastName?.type === "required" && (
                    <HelperText key={1}>This field is required.</HelperText>
                  ),
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextFieldCT
                type="date"
                label="วันเดือนปีเกิด"
                name="birthDate"
                margin="dense"
                defaultValue={
                  user?.data?.birthDate
                    ? moment(user?.data?.birthDate).format("YYYY-MM-DD")
                    : null
                }
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.birthDate}
                inputRef={register({
                  // required: true
                })}
                helperText={[
                  errors.birthDate?.type === "required" && (
                    <HelperText key={1}>This field is required.</HelperText>
                  ),
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextFieldCT
                label="เชื้อชาติ"
                name="race"
                margin="dense"
                error={!!errors.race}
                inputRef={register({
                  // required: true
                })}
                helperText={[
                  errors.race?.type === "required" && (
                    <HelperText key={1}>This field is required.</HelperText>
                  ),
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextFieldCT
                label="สัญชาติ"
                name="nation"
                margin="dense"
                error={!!errors.nation}
                inputRef={register({
                  // required: true
                })}
                helperText={[
                  errors.nation?.type === "required" && (
                    <HelperText key={1}>This field is required.</HelperText>
                  ),
                ]}
              />
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Typography variant="h6" color="secondary" gutterBottom>
            ภูมิลำเนา
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={3}>
              <TextFieldCT
                label="บ้านเลขที่"
                name="domicileNo"
                margin="dense"
                error={!!errors.domicileNo}
                inputRef={register({
                  // required: true
                })}
                helperText={[
                  errors.domicileNo?.type === "required" && (
                    <HelperText key={1}>This field is required.</HelperText>
                  ),
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextFieldCT
                label="หมู่"
                name="domicileMoo"
                margin="dense"
                error={!!errors.domicileMoo}
                inputRef={register({
                  // required: true
                })}
                helperText={[
                  errors.domicileMoo?.type === "required" && (
                    <HelperText key={1}>This field is required.</HelperText>
                  ),
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextFieldCT
                label="ตรอก/ซอย"
                name="domicileSoi"
                margin="dense"
                error={!!errors.domicileSoi}
                inputRef={register({
                  // required: true
                })}
                helperText={[
                  errors.domicileSoi?.type === "required" && (
                    <HelperText key={1}>This field is required.</HelperText>
                  ),
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextFieldCT
                label="ถนน"
                name="domicileRoad"
                margin="dense"
                error={!!errors.domicileRoad}
                inputRef={register({
                  // required: true
                })}
                helperText={[
                  errors.domicileRoad?.type === "required" && (
                    <HelperText key={1}>This field is required.</HelperText>
                  ),
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Controller
                as={ProvinceSelectOptions}
                control={control}
                reactSelectID={"domicileProvince"}
                name={"domicileProvince"}
                placeholder={"จังหวัด"}
                onChange={([selected]) => {
                  return selected?.value;
                }}
                error={!!errors.domicileProvince}
                inputRef={register({ required: true })}
                helperText={[
                  errors.domicileProvince?.type === "required" && (
                    <HelperText key={1}>This field is required.</HelperText>
                  ),
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Controller
                as={DistrictSelectOptions}
                control={control}
                reactSelectID={"domicileDistrict"}
                name={"domicileDistrict"}
                placeholder={"อำเภอ"}
                provinceID={
                  watchDomicileProvince ? watchDomicileProvince.value : ""
                }
                onChange={([selected]) => {
                  return selected?.value;
                }}
                inputRef={register({ required: true })}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.buttons}>
              <Button component={Link} to="/" className={classes.button}>
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
        </form>
      </div>
    </Fragment>
  );
};

export default RequestFormAdd;
