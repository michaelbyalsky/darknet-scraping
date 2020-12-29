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
  bar: {
    marginTop: "0rem",
    position: "fixed",
    zIndex: "300",
    width: "100%",
    marginLeft: "1000px",
    marginRight: 0,
  }
}));

export default function Notifications({ lastLog, faildLogs, keyword1 }) {
  const classes = useStyles();
  const [openLogs, setOpenLogs] = React.useState(false);
  const [openKeyWord1, setOpenKeyWord1] = React.useState(false);

  const handleClick = () => {
    setOpenLogs(true);
  };

  useEffect(() => {
    const filtered = faildLogs.filter((logs) => {
      return (
        moment(logs.date).toDate().valueOf() >
        moment().subtract(4, "minutes").valueOf()
      );
    });
    console.log(filtered);
    if (filtered.length !== 0) {
      setOpenLogs(true);
    }
  }, [faildLogs]);

  useEffect(() => {
    const filtered = keyword1.filter((pastes) => {
      return (
        moment(pastes.date).toDate().valueOf() >
        moment().subtract(4, "minuts").valueOf()
      );
    });
    if (filtered.length > 0) {
      setOpenKeyWord1(true);
    }
  }, [keyword1]);

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
  return (
    <div className={classes.root}>
      {lastLog !== null && (
        <div className={classes.bar}>
        <Alert severity={lastLog.status === "success" ? "success" : "error"}>
          {`Status: scrawl ${lastLog.status} in ${moment(lastLog.date).format(
            "DD-MM-YY, hh:mm A"
          )}, ${lastLog.new_pastes} pastes added`}
        </Alert>
        </div>
      )}
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
          new paste with keyword Detached - check notifictions!
        </Alert>
      </Snackbar>
    </div>
  );
}
