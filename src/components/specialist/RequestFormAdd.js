import React, { Fragment, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import moment from "moment";
import "moment/locale/th";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useForm, Controller } from "react-hook-form";

import TextFieldCT from "../shared/TextFieldCT";
import HelperText from "../shared/HelperText";

import AuthContext from "../../context/auth/authContext";
import SpecialistContext from "../../context/specialist/specialistContext";

import ProvinceSelectOptions from "../address/ProvinceSelectOptions";
import DistrictSelectOptions from "../address/DistrictSelectOptions";
import SubDistrictSelectOptions from "../address/SubDistrictSelectOptions";
import SplTypeSelectOptions from "../spltypes/SplTypeSelectOptions";
import SplSubTypeSelectOptions from "../spltypes/SplSubTypeSelectOptions";

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
  select: {
    marginTop: "8px",
    zIndex: 1000,
  },
  titleIcon: {
    verticalAlign: "middle",
    margin: theme.spacing(1),
  },
}));

const RequestFormAdd = (props) => {
  const classes = useStyles();

  let history = useHistory();

  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const specialistContext = useContext(SpecialistContext);
  const { addSpecialist } = specialistContext;

  const { register, handleSubmit, errors, control, watch } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      idCard: "1234567890123",
      govCard: "1234567890",
      cardExpire: "2024-12-31",
      prefixName: "นาย",
      birthDate: "1990-04-01",
      race: "ไทย",
      nation: "ไทย",

      domicileNo: "21/3",
      domicileMoo: "4",
      domicileSoi: "",
      domicileRoad: "",
      domicileProvince: 57,
      domicileDistrict: 801,
      domicileSubDistrict: 7114,
      domicileZipcode: 72140,
      domicileTel: "0822543216",
      domicileFax: "",
      domicileEmail: "thongchai@email.com",
      addressNo: "1470/106",
      addressMoo: "",
      addressSoi: "14",
      addressRoad: "เสนานิคม 1",
      addressProvince: 1,
      addressDistrict: 30,
      addressSubDistrict: 179,
      addressZipcode: 10900,
      addressTel: "0822543216",
      addressFax: "",
      addressEmail: "thongchai@email.com",
      contactNo: "",
      contactMoo: "",
      contactSoi: "",
      contactRoad: "",
      contactProvince: "",
      contactDistrict: "",
      contactSubDistrict: "",
      contactZipcode: "",
      contactTel: "",
      contactFax: "",
      contactEmail: "",

      workOccupation: "รับราชการ",
      workPosition: "นักวิชาการคอมพิวเตอร์ปฏิบัติการ",
      workPlaces: "ศาลยุติธรรม",
      workRoad: "รัชดาภิเษก",
      workSubDistrict: 182,
      workDistrict: 30,
      workProvince: 1,
      workZipcode: 10900,
      workTel: "0822543216",
      workFax: undefined,
      workEmail: "thongchai@email.com",
      bossFirstName: "เจอร์เกน",
      bossLastName: "คล็อปป์",
      bossNo: "111",
      bossMoo: undefined,
      bossSoi: undefined,
      bossRoad: "รัชดาภิเษก",
      bossSubDistrict: 182,
      bossDistrict: 30,
      bossProvince: 1,
      bossZipcode: 10900,
      bossTel: "0822543210",
      bossFax: undefined,
      bossEmail: "Klopp@email.com",
      workExperience: "1. บ.กิฟฟารีน สกายไลน์ ยูนิตี้ จำกัด\n2. กรมบัญชีกลาง",

      splTypeID: 1,
      splSubTypeID: 4,
      regisQualification: "ปริญญาตรี",
      regisDocument: "1. สำเนาบัตรประชาชน\n2. สำเนาทะเบียนบ้าน",
      regisEver: "การแพทย์",
      regisEverYear: 2560,
      regisEverPass: null,
      regisEverPassNo: 123456,
      regisEverNopass: null,
      regisEverNopassDesc: undefined,
    },
  });

  const watchDomicileProvince = watch("domicileProvince");
  const watchDomicileDistrict = watch("domicileDistrict");
  const watchAddressProvince = watch("addressProvince");
  const watchAddressDistrict = watch("addressDistrict");
  const watchContactProvince = watch("contactProvince");
  const watchContactDistrict = watch("contactDistrict");
  const watchWorkProvince = watch("workProvince");
  const watchWorkDistrict = watch("workDistrict");
  const watchBossProvince = watch("bossProvince");
  const watchBossDistrict = watch("bossDistrict");
  const watchSplTypeID = watch("splTypeID");

  const onSubmit = async (data) => {
    data.cardExpire = new Date(data.cardExpire).toJSON();
    data.birthDate = data.birthDate ? new Date(data.birthDate).toJSON() : null;

    data.domicileProvince = data.domicileProvince?.value ?? "";
    data.domicileDistrict = data.domicileDistrict?.value ?? "";
    data.domicileSubDistrict = data.domicileSubDistrict?.value ?? "";

    data.addressProvince = data.addressProvince?.value ?? "";
    data.addressDistrict = data.addressDistrict?.value ?? "";
    data.addressSubDistrict = data.addressSubDistrict?.value ?? "";

    data.contactProvince = data.contactProvince?.value ?? "";
    data.contactDistrict = data.contactDistrict?.value ?? "";
    data.contactSubDistrict = data.contactSubDistrict?.value ?? "";

    data.workProvince = data.workProvince?.value ?? "";
    data.workDistrict = data.workDistrict?.value ?? "";
    data.workSubDistrict = data.workSubDistrict?.value ?? "";

    data.bossProvince = data.bossProvince?.value ?? "";
    data.bossDistrict = data.bossDistrict?.value ?? "";
    data.bossSubDistrict = data.bossSubDistrict?.value ?? "";

    data.splTypeID = data.splTypeID?.value ?? "";
    data.splSubTypeID = data.splSubTypeID?.value ?? "";

    console.log(data);

    const formData = new FormData();
    const reqFormDataArray = Object.keys(data);

    reqFormDataArray.map((key) => {
      if (data[key] !== "") {
        formData.append(key, data[key]);
      }

      return key;
    });
    console.log(formData);
    await addSpecialist(formData);
    history.push("/");
  };

  return (
    <Fragment>
      <div className={classes.root}>
        <Typography variant="h5" color="primary" gutterBottom>
          <AccountBoxIcon className={classes.titleIcon} fontSize="large" />
          ส่งคำขอขึ้นทะเบียนเป็นผู้เชี่ยวชาญฯ
        </Typography>
        <Divider className={classes.divider} />
        <form onSubmit={handleSubmit(onSubmit)}>
          {user?.data ? (
            <div>
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
                    inputRef={register({
                      // required: true
                    })}
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
                <Grid item xs={12} sm={3} className={classes.select}>
                  <Controller
                    as={ProvinceSelectOptions}
                    control={control}
                    reactSelectID={"domicileProvince"}
                    name={"domicileProvince"}
                    placeholder={"จังหวัด"}
                    error={!!errors.domicileProvince}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.domicileProvince?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={3} className={classes.select}>
                  <Controller
                    as={DistrictSelectOptions}
                    control={control}
                    reactSelectID={"domicileDistrict"}
                    name={"domicileDistrict"}
                    placeholder={"อำเภอ"}
                    provinceID={
                      watchDomicileProvince?.value ?? watch("domicileProvince")
                    }
                    onChange={([selected]) => {
                      return selected?.value;
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={3} className={classes.select}>
                  <Controller
                    as={SubDistrictSelectOptions}
                    control={control}
                    reactSelectID={"domicileSubDistrict"}
                    name={"domicileSubDistrict"}
                    placeholder={"ตำบล"}
                    provinceID={
                      watchDomicileProvince?.value ?? watch("domicileProvince")
                    }
                    districtID={
                      watchDomicileDistrict?.value ?? watch("domicileDistrict")
                    }
                    onChange={([selected]) => {
                      return selected?.value;
                    }}
                    inputRef={register({
                      // required: true
                    })}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextFieldCT
                    label="รหัสไปรษณีย์"
                    name="domicileZipcode"
                    margin="dense"
                    error={!!errors.domicileZipcode}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.domicileZipcode?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextFieldCT
                    label="หมายเลขโทรศัพท์"
                    name="domicileTel"
                    margin="dense"
                    error={!!errors.domicileTel}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.domicileTel?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextFieldCT
                    label="โทรสาร"
                    name="domicileFax"
                    margin="dense"
                    error={!!errors.domicileFax}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.domicileFax?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextFieldCT
                    label="อีเมล์"
                    name="domicileEmail"
                    margin="dense"
                    error={!!errors.domicileEmail}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.domicileEmail?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
              </Grid>
              <Divider className={classes.divider} />
              <Typography variant="h6" color="secondary" gutterBottom>
                ที่อยู่ปัจจุบัน
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={3}>
                  <TextFieldCT
                    label="บ้านเลขที่"
                    name="addressNo"
                    margin="dense"
                    error={!!errors.addressNo}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.addressNo?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextFieldCT
                    label="หมู่"
                    name="addressMoo"
                    margin="dense"
                    error={!!errors.addressMoo}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.addressMoo?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextFieldCT
                    label="ตรอก/ซอย"
                    name="addressSoi"
                    margin="dense"
                    error={!!errors.addressSoi}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.addressSoi?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextFieldCT
                    label="ถนน"
                    name="addressRoad"
                    margin="dense"
                    error={!!errors.addressRoad}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.addressRoad?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={3} className={classes.select}>
                  <Controller
                    as={<ProvinceSelectOptions />}
                    control={control}
                    reactSelectID={"addressProvince"}
                    name={"addressProvince"}
                    placeholder={"จังหวัด"}
                    error={!!errors.addressProvince}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.addressProvince?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={3} className={classes.select}>
                  <Controller
                    as={DistrictSelectOptions}
                    control={control}
                    reactSelectID={"addressDistrict"}
                    name={"addressDistrict"}
                    placeholder={"อำเภอ"}
                    provinceID={
                      watchAddressProvince?.value ?? watch("addressProvince")
                    }
                    onChange={([selected]) => {
                      return selected?.value;
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={3} className={classes.select}>
                  <Controller
                    as={SubDistrictSelectOptions}
                    control={control}
                    reactSelectID={"addressSubDistrict"}
                    name={"addressSubDistrict"}
                    placeholder={"ตำบล"}
                    provinceID={
                      watchAddressProvince?.value ?? watch("addressProvince")
                    }
                    districtID={
                      watchAddressDistrict?.value ?? watch("addressDistrict")
                    }
                    onChange={([selected]) => {
                      return selected?.value;
                    }}
                    inputRef={register({
                      // required: true
                    })}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextFieldCT
                    label="รหัสไปรษณีย์"
                    name="addressZipcode"
                    margin="dense"
                    error={!!errors.addressZipcode}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.addressZipcode?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextFieldCT
                    label="หมายเลขโทรศัพท์"
                    name="addressTel"
                    margin="dense"
                    error={!!errors.addressTel}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.addressTel?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextFieldCT
                    label="โทรสาร"
                    name="addressFax"
                    margin="dense"
                    error={!!errors.addressFax}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.addressFax?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextFieldCT
                    label="อีเมล์"
                    name="addressEmail"
                    margin="dense"
                    error={!!errors.addressEmail}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.addressEmail?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
              </Grid>
              <Divider className={classes.divider} />
              <Typography variant="h6" color="secondary" gutterBottom>
                ที่อยู่ที่สามารถติดต่อได้สะดวก
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={3}>
                  <TextFieldCT
                    label="บ้านเลขที่"
                    name="contactNo"
                    margin="dense"
                    error={!!errors.contactNo}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.contactNo?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextFieldCT
                    label="หมู่"
                    name="contactMoo"
                    margin="dense"
                    error={!!errors.contactMoo}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.contactMoo?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextFieldCT
                    label="ตรอก/ซอย"
                    name="contactSoi"
                    margin="dense"
                    error={!!errors.contactSoi}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.contactSoi?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextFieldCT
                    label="ถนน"
                    name="contactRoad"
                    margin="dense"
                    error={!!errors.contactRoad}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.contactRoad?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={3} className={classes.select}>
                  <Controller
                    as={<ProvinceSelectOptions />}
                    control={control}
                    reactSelectID={"contactProvince"}
                    name={"contactProvince"}
                    placeholder={"จังหวัด"}
                    error={!!errors.contactProvince}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.contactProvince?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={3} className={classes.select}>
                  <Controller
                    as={DistrictSelectOptions}
                    control={control}
                    reactSelectID={"contactDistrict"}
                    name={"contactDistrict"}
                    placeholder={"อำเภอ"}
                    provinceID={
                      watchContactProvince?.value ?? watch("contactProvince")
                    }
                    onChange={([selected]) => {
                      return selected?.value;
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={3} className={classes.select}>
                  <Controller
                    as={SubDistrictSelectOptions}
                    control={control}
                    reactSelectID={"contactSubDistrict"}
                    name={"contactSubDistrict"}
                    placeholder={"ตำบล"}
                    provinceID={
                      watchContactProvince?.value ?? watch("contactProvince")
                    }
                    districtID={
                      watchContactDistrict?.value ?? watch("contactDistrict")
                    }
                    onChange={([selected]) => {
                      return selected?.value;
                    }}
                    inputRef={register({
                      // required: true
                    })}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextFieldCT
                    label="รหัสไปรษณีย์"
                    name="contactZipcode"
                    margin="dense"
                    error={!!errors.contactZipcode}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.contactZipcode?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextFieldCT
                    label="หมายเลขโทรศัพท์"
                    name="contactTel"
                    margin="dense"
                    error={!!errors.contactTel}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.contactTel?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextFieldCT
                    label="โทรสาร"
                    name="contactFax"
                    margin="dense"
                    error={!!errors.contactFax}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.contactFax?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextFieldCT
                    label="อีเมล์"
                    name="contactEmail"
                    margin="dense"
                    error={!!errors.contactEmail}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.contactEmail?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
              </Grid>
              <Divider className={classes.divider} />
              <Typography variant="h6" color="secondary" gutterBottom>
                ข้อมูลการทำงาน
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <TextFieldCT
                    label="อาชีพ"
                    name="workOccupation"
                    margin="dense"
                    error={!!errors.workOccupation}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.workOccupation?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextFieldCT
                    label="ตำแหน่ง"
                    name="workPosition"
                    margin="dense"
                    error={!!errors.workPosition}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.workPosition?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextFieldCT
                    label="สถานที่ทำงาน"
                    name="workPlaces"
                    margin="dense"
                    error={!!errors.workPlaces}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.workPlaces?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextFieldCT
                    label="ถนน"
                    name="workRoad"
                    margin="dense"
                    error={!!errors.workRoad}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.workRoad?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={3} className={classes.select}>
                  <Controller
                    as={<ProvinceSelectOptions />}
                    control={control}
                    reactSelectID={"workProvince"}
                    name={"workProvince"}
                    placeholder={"จังหวัด"}
                    error={!!errors.workProvince}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.workProvince?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={3} className={classes.select}>
                  <Controller
                    as={DistrictSelectOptions}
                    control={control}
                    reactSelectID={"workDistrict"}
                    name={"workDistrict"}
                    placeholder={"อำเภอ"}
                    provinceID={
                      watchWorkProvince?.value ?? watch("workProvince")
                    }
                    onChange={([selected]) => {
                      return selected?.value;
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={3} className={classes.select}>
                  <Controller
                    as={SubDistrictSelectOptions}
                    control={control}
                    reactSelectID={"workSubDistrict"}
                    name={"workSubDistrict"}
                    placeholder={"ตำบล"}
                    provinceID={
                      watchWorkProvince?.value ?? watch("workProvince")
                    }
                    districtID={
                      watchWorkDistrict?.value ?? watch("workDistrict")
                    }
                    onChange={([selected]) => {
                      return selected?.value;
                    }}
                    inputRef={register({
                      // required: true
                    })}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextFieldCT
                    label="รหัสไปรษณีย์"
                    name="workZipcode"
                    margin="dense"
                    error={!!errors.workZipcode}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.workZipcode?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextFieldCT
                    label="หมายเลขโทรศัพท์"
                    name="workTel"
                    margin="dense"
                    error={!!errors.workTel}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.workTel?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextFieldCT
                    label="โทรสาร"
                    name="workFax"
                    margin="dense"
                    error={!!errors.workFax}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.workFax?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextFieldCT
                    label="อีเมล์"
                    name="workEmail"
                    margin="dense"
                    error={!!errors.workEmail}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.workEmail?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
              </Grid>
              <Divider className={classes.divider} />
              <Typography variant="h6" color="secondary" gutterBottom>
                ข้อมูลหัวหน้า/ผู้บังคับบัญชา
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <TextFieldCT
                    label="ชื่อ"
                    name="bossFirstName"
                    margin="dense"
                    error={!!errors.bossFirstName}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.bossFirstName?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextFieldCT
                    label="นามสกุล"
                    name="bossLastName"
                    margin="dense"
                    error={!!errors.bossLastName}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.bossLastName?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextFieldCT
                    label="บ้านเลขที่"
                    name="bossNo"
                    margin="dense"
                    error={!!errors.bossNo}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.bossNo?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextFieldCT
                    label="หมู่"
                    name="bossMoo"
                    margin="dense"
                    error={!!errors.bossMoo}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.bossMoo?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextFieldCT
                    label="ตรอก/ซอย"
                    name="bossSoi"
                    margin="dense"
                    error={!!errors.bossSoi}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.bossSoi?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextFieldCT
                    label="ถนน"
                    name="bossRoad"
                    margin="dense"
                    error={!!errors.bossRoad}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.bossRoad?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={3} className={classes.select}>
                  <Controller
                    as={<ProvinceSelectOptions />}
                    control={control}
                    reactSelectID={"bossProvince"}
                    name={"bossProvince"}
                    placeholder={"จังหวัด"}
                    error={!!errors.bossProvince}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.bossProvince?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={3} className={classes.select}>
                  <Controller
                    as={DistrictSelectOptions}
                    control={control}
                    reactSelectID={"bossDistrict"}
                    name={"bossDistrict"}
                    placeholder={"อำเภอ"}
                    provinceID={
                      watchBossProvince?.value ?? watch("bossProvince")
                    }
                    onChange={([selected]) => {
                      return selected?.value;
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={3} className={classes.select}>
                  <Controller
                    as={SubDistrictSelectOptions}
                    control={control}
                    reactSelectID={"bossSubDistrict"}
                    name={"bossSubDistrict"}
                    placeholder={"ตำบล"}
                    provinceID={
                      watchBossProvince?.value ?? watch("bossProvince")
                    }
                    districtID={
                      watchBossDistrict?.value ?? watch("bossDistrict")
                    }
                    onChange={([selected]) => {
                      return selected?.value;
                    }}
                    inputRef={register({
                      // required: true
                    })}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextFieldCT
                    label="รหัสไปรษณีย์"
                    name="bossZipcode"
                    margin="dense"
                    error={!!errors.bossZipcode}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.bossZipcode?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextFieldCT
                    label="หมายเลขโทรศัพท์"
                    name="bossTel"
                    margin="dense"
                    error={!!errors.bossTel}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.bossTel?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextFieldCT
                    label="โทรสาร"
                    name="bossFax"
                    margin="dense"
                    error={!!errors.bossFax}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.bossFax?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextFieldCT
                    label="อีเมล์"
                    name="bossEmail"
                    margin="dense"
                    error={!!errors.bossEmail}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.bossEmail?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography variant="h6" color="secondary" gutterBottom>
                    ประวัติการทำงาน
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <TextFieldCT
                    multiline
                    rows={5}
                    label="ประวัติการทำงาน/สถานที่ทำงาน/หนัวหน้าหรือผู้บังคับบัญชา/วันเดือนปี/เหตุผลที่ออก"
                    name="workExperience"
                    margin="dense"
                    error={!!errors.workExperience}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.workExperience?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
              </Grid>
              <Divider className={classes.divider} />
              <Typography variant="h6" color="secondary" gutterBottom>
                มีความประสงค์จะขอขึ้นทะเบียนเป็นผู้เชี่ยวชาญของศาล
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6} className={classes.select}>
                  <Controller
                    as={SplTypeSelectOptions}
                    control={control}
                    reactSelectID={"splTypeID"}
                    name={"splTypeID"}
                    placeholder={"ในด้าน"}
                    error={!!errors.splTypeID}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.splTypeID?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={6} className={classes.select}>
                  <Controller
                    as={SplSubTypeSelectOptions}
                    control={control}
                    reactSelectID={"splSubTypeID"}
                    name={"splSubTypeID"}
                    placeholder={"สาขา"}
                    splTypeID={watchSplTypeID?.value ?? watch("splTypeID")}
                    onChange={([selected]) => {
                      return selected?.value;
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextFieldCT
                    label="โดยมีคุณวุฒิ"
                    name="regisQualification"
                    margin="dense"
                    error={!!errors.regisQualification}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.regisQualification?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextFieldCT
                    multiline
                    rows={5}
                    label="และได้แสดงหลักฐานพร้อมผลงานประกอบคำขอขึ้นทะเบียนดังนี้"
                    name="regisDocument"
                    margin="dense"
                    error={!!errors.regisDocument}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.regisDocument?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextFieldCT
                    label="เคยขอขึ้นทะเบียนแล้วในสาขา"
                    name="regisEver"
                    margin="dense"
                    error={!!errors.regisEver}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.regisEver?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextFieldCT
                    label="ปี พ.ศ."
                    name="regisEverYear"
                    margin="dense"
                    error={!!errors.regisEverYear}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.regisEverYear?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextFieldCT
                    label="ได้รับขึ้นทะเบียนเลขที่"
                    name="regisEverPassNo"
                    margin="dense"
                    error={!!errors.regisEverPassNo}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.regisEverPassNo?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextFieldCT
                    label="ไม่ได้รับขึ้นทะเบียนเนื่องจาก"
                    name="regisEverNopassDesc"
                    margin="dense"
                    error={!!errors.regisEverNopassDesc}
                    inputRef={register({
                      // required: true
                    })}
                    helperText={[
                      errors.regisEverNopassDesc?.type === "required" && (
                        <HelperText key={1}>This field is required.</HelperText>
                      ),
                    ]}
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
              </Grid>{" "}
            </div>
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

export default RequestFormAdd;
