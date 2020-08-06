import React, { Fragment, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import moment from "moment";
import "moment/locale/th";
import Select from "react-select";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import CircularProgress from "@material-ui/core/CircularProgress";
import { HOST } from "../../config";

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
  titleSub: {
    color: theme.palette.success.main,
  },
}));

const statusReqformOptions = [
  { value: "checking", label: "ยื่นเอกสารแล้ว" },
  { value: "verify", label: "รอยืนยันตัวตน" },
  { value: "approved", label: "อนุมัติเป็นผู้เชี่ยวชาญ" },
];

const RequestFormAdd = (props) => {
  const classes = useStyles();

  let history = useHistory();
  const { spData, title, edit } = props;
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const specialistContext = useContext(SpecialistContext);
  const { addSpecialist, updateSpecialist } = specialistContext;

  const { register, handleSubmit, errors, control, watch } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      idCard: spData?.idCard ?? "1234567890123",
      govCard: spData?.govCard ?? "1234567890",
      cardExpire:
        moment(spData?.cardExpire).format("YYYY-MM-DD") ?? "2024-12-31",
      prefixName: spData?.prefixName ?? "นาย",
      firstName: spData?.firstName ?? user?.data?.firstName ?? "",
      lastName: spData?.lastName ?? user?.data?.lastName ?? "",
      birthDate: moment(spData?.birthDate).format("YYYY-MM-DD") ?? "1990-04-01",
      race: spData?.race ?? "ไทย",
      nation: spData?.nation ?? "ไทย",

      domicileNo: spData?.domicileNo ?? "21/3",
      domicileMoo: spData?.domicileMoo ?? "4",
      domicileSoi: spData?.domicileSoi ?? "",
      domicileRoad: spData?.domicileRoad ?? "",
      domicileProvince: spData?.domicileProvince ?? 57,
      domicileDistrict: spData?.domicileDistrict ?? 801,
      domicileSubDistrict: spData?.domicileSubDistrict ?? 7114,
      domicileZipcode: spData?.domicileZipcode ?? 72140,
      domicileTel: spData?.domicileTel ?? "0822543216",
      domicileFax: spData?.domicileFax ?? "",
      domicileEmail: spData?.domicileEmail ?? "thongchai@email.com",
      addressNo: spData?.addressNo ?? "1470/106",
      addressMoo: spData?.addressMoo ?? "",
      addressSoi: spData?.addressSoi ?? "14",
      addressRoad: spData?.addressRoad ?? "เสนานิคม 1",
      addressProvince: spData?.addressProvince ?? 1,
      addressDistrict: spData?.addressDistrict ?? 30,
      addressSubDistrict: spData?.addressSubDistrict ?? 179,
      addressZipcode: spData?.addressZipcode ?? 10900,
      addressTel: spData?.addressTel ?? "0822543216",
      addressFax: spData?.addressFax ?? "",
      addressEmail: spData?.addressEmail ?? "thongchai@email.com",
      contactNo: spData?.contactNo ?? "",
      contactMoo: spData?.contactMoo ?? "",
      contactSoi: spData?.contactSoi ?? "",
      contactRoad: spData?.contactRoad ?? "",
      contactProvince: spData?.contactProvince ?? "",
      contactDistrict: spData?.contactDistrict ?? "",
      contactSubDistrict: spData?.contactSubDistrict ?? "",
      contactZipcode: spData?.contactZipcode ?? "",
      contactTel: spData?.contactTel ?? "",
      contactFax: spData?.contactFax ?? "",
      contactEmail: spData?.contactEmail ?? "",

      workOccupation: spData?.workOccupation ?? "รับราชการ",
      workPosition: spData?.workPosition ?? "นักวิชาการคอมพิวเตอร์ปฏิบัติการ",
      workPlaces: spData?.workPlaces ?? "ศาลยุติธรรม",
      workRoad: spData?.workRoad ?? "รัชดาภิเษก",
      workSubDistrict: spData?.workSubDistrict ?? 182,
      workDistrict: spData?.workDistrict ?? 30,
      workProvince: spData?.workProvince ?? 1,
      workZipcode: spData?.workZipcode ?? 10900,
      workTel: spData?.workTel ?? "0822543216",
      workFax: spData?.workFax ?? undefined,
      workEmail: spData?.workEmail ?? "thongchai@email.com",
      bossFirstName: spData?.bossFirstName ?? "เจอร์เกน",
      bossLastName: spData?.bossLastName ?? "คล็อปป์",
      bossNo: spData?.bossNo ?? "111",
      bossMoo: spData?.bossMoo ?? undefined,
      bossSoi: spData?.bossSoi ?? undefined,
      bossRoad: spData?.bossRoad ?? "รัชดาภิเษก",
      bossSubDistrict: spData?.bossSubDistrict ?? 182,
      bossDistrict: spData?.bossDistrict ?? 30,
      bossProvince: spData?.bossProvince ?? 1,
      bossZipcode: spData?.bossZipcode ?? 10900,
      bossTel: spData?.bossTel ?? "0822543210",
      bossFax: spData?.bossFax ?? undefined,
      bossEmail: spData?.bossEmail ?? "Klopp@email.com",
      workExperience:
        spData?.workExperience ??
        "1. บ.กิฟฟารีน สกายไลน์ ยูนิตี้ จำกัด\n2. กรมบัญชีกลาง",

      splTypeID: spData?.splTypeID ?? 1,
      splSubTypeID: spData?.splSubTypeID ?? 4,
      regisQualification: spData?.regisQualification ?? "ปริญญาตรี",
      regisDocument:
        spData?.regisDocument ?? "1. สำเนาบัตรประชาชน\n2. สำเนาทะเบียนบ้าน",
      regisEver: spData?.regisEver ?? "การแพทย์",
      regisEverYear: spData?.regisEverYear ?? 2560,
      regisEverPass: spData?.regisEverPass ?? null,
      regisEverPassNo: spData?.regisEverPassNo ?? 123456,
      regisEverNopass: spData?.regisEverNopass ?? null,
      regisEverNopassDesc: spData?.regisEverNopassDesc ?? undefined,
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

  const [fileAttachIdcard, setFileAttachIdcard] = useState("");
  const [fileAttachHouse, setFileAttachHouse] = useState("");
  const [fileAttachGovCard, setFileAttachGovCard] = useState("");
  const [fileAttachQualification, setFileAttachQualification] = useState("");
  const onChangeFileHandler = (event) => {
    switch (event.target.name) {
      case "fileAttachIdcard": {
        setFileAttachIdcard(event.target.files[0]);
        return;
      }
      case "fileAttachHouse": {
        setFileAttachHouse(event.target.files[0]);
        return;
      }
      case "fileAttachGovCard": {
        setFileAttachGovCard(event.target.files[0]);
        return;
      }
      case "fileAttachQualification": {
        setFileAttachQualification(event.target.files[0]);
        return;
      }
      default:
        return;
    }
  };

  const onSubmit = async (data) => {
    data.cardExpire = new Date(data.cardExpire).toJSON();
    data.birthDate = data.birthDate ? new Date(data.birthDate).toJSON() : null;

    data.domicileProvince =
      data.domicileProvince?.value ?? data.domicileProvince ?? "";
    data.domicileDistrict =
      data.domicileDistrict?.value ?? data.domicileDistrict ?? "";
    data.domicileSubDistrict =
      data.domicileSubDistrict?.value ?? data.domicileSubDistrict ?? "";

    data.addressProvince =
      data.addressProvince?.value ?? data.addressProvince ?? "";
    data.addressDistrict =
      data.addressDistrict?.value ?? data.addressDistrict ?? "";
    data.addressSubDistrict =
      data.addressSubDistrict?.value ?? data.addressSubDistrict ?? "";

    data.contactProvince =
      data.contactProvince?.value ?? data.contactProvince ?? "";
    data.contactDistrict =
      data.contactDistrict?.value ?? data.contactDistrict ?? "";
    data.contactSubDistrict =
      data.contactSubDistrict?.value ?? data.contactSubDistrict ?? "";

    data.workProvince = data.workProvince?.value ?? data.workProvince ?? "";
    data.workDistrict = data.workDistrict?.value ?? data.workDistrict ?? "";
    data.workSubDistrict =
      data.workSubDistrict?.value ?? data.workSubDistrict ?? "";

    data.bossProvince = data.bossProvince?.value ?? data.bossProvince ?? "";
    data.bossDistrict = data.bossDistrict?.value ?? data.bossDistrict ?? "";
    data.bossSubDistrict =
      data.bossSubDistrict?.value ?? data.bossSubDistrict ?? "";

    data.splTypeID = data.splTypeID?.value ?? data.splTypeID ?? "";
    data.splSubTypeID = data.splSubTypeID?.value ?? data.splSubTypeID ?? "";

    data.statusReqform = data.statusReqform?.value ?? data.statusReqform ?? "";

    data.fileAttachIdcard = fileAttachIdcard;
    data.fileAttachHouse = fileAttachHouse;
    data.fileAttachGovCard = fileAttachGovCard;
    data.fileAttachQualification = fileAttachQualification;

    const formData = new FormData();
    const reqFormDataArray = Object.keys(data);

    reqFormDataArray.map((key) => {
      if (data[key] !== "") {
        formData.append(key, data[key]);
      }

      return key;
    });
    if (!edit) {
      console.log("add");
      await addSpecialist(formData);
      history.push("/");
    } else {
      console.log("edit");
      await updateSpecialist(spData?.ID, formData);
      if (spData?.isSpecialist === true) {
        history.push("/specialist");
      } else {
        history.push("/reqforms");
      }
    }
  };

  return (
    <Fragment>
      <div className={classes.root}>
        <Typography variant="h5" color="primary" gutterBottom>
          <AccountBoxIcon className={classes.titleIcon} fontSize="large" />
          {title}{" "}
          {spData && (
            <span className={classes.titleSub}>
              {" : " + spData?.firstName + " " + spData?.lastName}
            </span>
          )}
        </Typography>
        <Divider className={classes.divider} />
        <form onSubmit={handleSubmit(onSubmit)}>
          {user?.data ? (
            <div>
              {user?.data?.roleId !== 3 ? (
                <div>
                  <Typography variant="h6" color="secondary" gutterBottom>
                    สถานะการตรวจคุณสมบัติ
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={6} className={classes.select}>
                      <Controller
                        as={Select}
                        control={control}
                        options={statusReqformOptions}
                        reactSelectID={"statusReqform"}
                        name={"statusReqform"}
                        labelName={"สถานะการตรวจคุณสมบัติ"}
                        onChange={([selected]) => {
                          return selected?.value;
                        }}
                        defaultValue={
                          spData?.statusReqform
                            ? statusReqformOptions.find(
                                (s) => s.value === spData?.statusReqform
                              )
                            : statusReqformOptions[0]
                        }
                        inputRef={register}
                      />
                    </Grid>{" "}
                  </Grid>
                  <Divider className={classes.divider} />
                </div>
              ) : (
                ""
              )}
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
              <Divider className={classes.divider} />
              <Typography variant="h6" color="secondary" gutterBottom>
                เอกสารแนบ
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12}>
                  1. สำเนาบัตรประจำตัวประชาชน
                  {user?.data?.roleId !== 3 ? (
                    <a
                      // eslint-disable-next-line react/jsx-no-target-blank
                      target="_blank"
                      href={HOST + spData?.fileAttachIdcardURL}
                    >
                      <PictureAsPdfIcon
                        fontSize="large"
                        color="error"
                        className={classes.titleIcon}
                      />
                    </a>
                  ) : (
                    <TextFieldCT
                      type="file"
                      id="fileAttachIdcard"
                      name="fileAttachIdcard"
                      error={!!errors.fileAttachIdcard}
                      onChange={onChangeFileHandler}
                      inputRef={register({
                        // required: true,
                      })}
                      helperText={
                        errors.fileAttachIdcard &&
                        errors.fileAttachIdcard.type === "required" && (
                          <HelperText>กรุณาเลือกไฟล์</HelperText>
                        )
                      }
                    />
                  )}
                </Grid>
                <Grid item xs={12} sm={12}>
                  2. สำเนาทะเบียนบ้าน
                  {user?.data?.roleId !== 3 ? (
                    <a
                      // eslint-disable-next-line react/jsx-no-target-blank
                      target="_blank"
                      href={HOST + spData?.fileAttachHouseURL}
                    >
                      <PictureAsPdfIcon
                        fontSize="large"
                        color={"error"}
                        className={classes.titleIcon}
                      />
                    </a>
                  ) : (
                    <TextFieldCT
                      type="file"
                      id="fileAttachHouse"
                      name="fileAttachHouse"
                      error={!!errors.fileAttachHouse}
                      onChange={onChangeFileHandler}
                      inputRef={register({
                        // required: true,
                      })}
                      helperText={
                        errors.fileAttachHouse &&
                        errors.fileAttachHouse.type === "required" && (
                          <HelperText>กรุณาเลือกไฟล์</HelperText>
                        )
                      }
                    />
                  )}
                </Grid>
                <Grid item xs={12} sm={12}>
                  3. สำเนาบัตรประจำตัวข้าราชการ
                  {user?.data?.roleId !== 3 ? (
                    <a
                      // eslint-disable-next-line react/jsx-no-target-blank
                      target="_blank"
                      href={HOST + spData?.fileAttachGovCardURL}
                    >
                      <PictureAsPdfIcon
                        fontSize="large"
                        color={"error"}
                        className={classes.titleIcon}
                      />
                    </a>
                  ) : (
                    <TextFieldCT
                      type="file"
                      id="fileAttachGovCard"
                      name="fileAttachGovCard"
                      error={!!errors.fileAttachGovCard}
                      onChange={onChangeFileHandler}
                      inputRef={register({
                        // required: true,
                      })}
                      helperText={
                        errors.fileAttachGovCard &&
                        errors.fileAttachGovCard.type === "required" && (
                          <HelperText>กรุณาเลือกไฟล์</HelperText>
                        )
                      }
                    />
                  )}
                </Grid>
                <Grid item xs={12} sm={12}>
                  4. สำเนาหนังสือแสดงคุณวุฒิ
                  {user?.data?.roleId !== 3 ? (
                    <a
                      // eslint-disable-next-line react/jsx-no-target-blank
                      target="_blank"
                      href={HOST + spData?.fileAttachQualificationURL}
                    >
                      <PictureAsPdfIcon
                        fontSize="large"
                        color={"error"}
                        className={classes.titleIcon}
                      />
                    </a>
                  ) : (
                    <TextFieldCT
                      type="file"
                      id="fileAttachQualification"
                      name="fileAttachQualification"
                      error={!!errors.fileAttachQualification}
                      onChange={onChangeFileHandler}
                      inputRef={register({
                        // required: true,
                      })}
                      helperText={
                        errors.fileAttachQualification &&
                        errors.fileAttachQualification.type === "required" && (
                          <HelperText>กรุณาเลือกไฟล์</HelperText>
                        )
                      }
                    />
                  )}
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
