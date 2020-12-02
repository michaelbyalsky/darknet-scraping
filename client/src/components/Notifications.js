import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import api from "../api/index";
import moment from "moment";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Notifications({ faildLogs, keyword1, keyword2 }) {
  const classes = useStyles();
  const [openLogs, setOpenLogs] = React.useState(false);
  const [openKeyWord1, setOpenKeyWord1] = React.useState(false);
  const [openKeyWord2, setOpenKeyWord2] = React.useState(false);
  console.log(keyword1);

  const handleClick = () => {
    setOpenLogs(true);
  };

  useEffect(() => {
    const filtered = faildLogs.filter((logs) => {
      return (
        moment(logs.date).toDate().valueOf() >
        moment().subtract(2, "minutes").valueOf()
      );
    });
    if (filtered.length > 0) {
      setOpenLogs(true);
    }
    console.log(filtered);
  }, [faildLogs]);

  useEffect(() => {
    const filtered = keyword1.filter((pastes) => {
      return (
        moment(pastes.date).toDate().valueOf() >
        moment().subtract(1, "hours").valueOf()
      );
    });
    if (filtered.length > 0) {
      setOpenKeyWord1(true);
    }
    console.log(filtered);
  }, [keyword1]);

  useEffect(() => {
    const filtered = keyword2.filter((pastes) => {
      return (
        moment(pastes.date).toDate().valueOf() >
        moment().subtract(1, "hours").valueOf()
      );
    });
    if (filtered.length > 0) {
      setOpenKeyWord2(true);
    }
    console.log(filtered);
  }, [keyword2]);

  const handleCloseLogs = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenLogs(false);
  };

  const handleCloseKeyword1 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenKeyWord1(false);
  };
  const handleCloseKeyword2 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenKeyWord2(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={openLogs}
        autoHideDuration={6000}
        onClose={handleCloseLogs}
      >
        <Alert onClose={handleCloseLogs} severity="error">
          scrawler crashed
        </Alert>
      </Snackbar>
      <Snackbar
        open={openKeyWord1}
        autoHideDuration={6000}
        onClose={handleCloseKeyword1}
      >
        <Alert onClose={handleCloseKeyword1} severity="info">
          new paste with keyword Money Detached!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openKeyWord2}
        autoHideDuration={6000}
        onClose={handleCloseKeyword2}
      >
        <Alert onClose={handleCloseKeyword2} severity="info">
        new paste with keyword Guns Detached!
        </Alert>
      </Snackbar>
    </div>
  );
}
