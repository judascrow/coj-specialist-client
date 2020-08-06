import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import RequestFormAdd from "./RequestFormAdd";
import SpecialistContext from "../../context/specialist/specialistContext";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

const SpecialistFormAdmin = (props) => {
  const classes = useStyles();
  const specialistContext = useContext(SpecialistContext);

  const { getSpecialist, specialistData } = specialistContext;
  const { match } = props;
  const id = match.params.id;

  const setUserData = async () => {
    await getSpecialist(id);
    // setA(true);
  };

  useEffect(() => {
    setUserData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.root}>
      {specialistData?.ID === parseInt(id) ? (
        <RequestFormAdd
          id={id}
          edit={true}
          spData={specialistData}
          title="คำขอขึ้นทะเบียนเป็นผู้เชี่ยวชาญฯ"
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

export default SpecialistFormAdmin;
