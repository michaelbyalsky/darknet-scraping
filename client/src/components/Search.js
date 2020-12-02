import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import SearchIcon from "@material-ui/icons/Search";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import EventBusyIcon from "@material-ui/icons/EventBusy";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import ScheduleIcon from "@material-ui/icons/Schedule";
import ChooseLabels from "./Lables";
import NotificationImportantIcon from "@material-ui/icons/NotificationImportant";
import api from "../api/index";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import MuiAlert from "@material-ui/lab/Alert";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "10px",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    position: "fixed",
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  toolbar: {
    minHeight: 0,
    alignItems: "flex-start",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  buttons2: {
    width: "400px",
  },
  buttons1: {
    marginRigth: 0,

    alignSelf: "flex-end",
  },
  button: {
    margin: "2px",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Search = ({
  setAllNotitfications,
  searchText,
  setSearchText,
  faildLogs,
  pastes,
  setPastes,
  allNotitfications,
  fatchAll
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleUpdate = async (id, type) => {
    try {
      if (type === "keyword") {
        await api.update("/pastes", { _id: id });
        const filtered = allNotitfications.filter((not) => {
          return not._id !== id
        })
        setAllNotitfications(filtered)
      } else {
        await api.update("/logs", { _id: id });
      }
      const filtered = allNotitfications.filter((not) => {
        return not._id !== id
      })
      setAllNotitfications(filtered)
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={classes.grow}>
      <AppBar size="small" className={classes.appBar} id="wrapper">
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.title} variant="h6" noWrap>
            DarkNet
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              size="small"
              id="searchInput"
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div sytle={{ width: "100px" }}></div>
          <div />
          <div id="buttons" className={classes.buttons2}>
            <ChooseLabels pastes={pastes} setPastes={setPastes} />
          </div>
          <div id="buttons" className={classes.buttons1} />
          <div id="buttons" className={classes.buttons1}>
            <IconButton
              ref={anchorRef}
              aria-controls={open ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
              id="sortByUnDone"
              title="sort by undone"
              // onClick={sortByUnDone}
              size="small"
              variant="contained"
              color="primary"
            >
              <Badge badgeContent={allNotitfications.length} color="secondary">
                <NotificationImportantIcon color="action" />
              </Badge>
            </IconButton>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              style={{ overflowY: "auto", height: "300px" }}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <List autoFocusItem={open} onKeyDown={handleListKeyDown}>
                        {allNotitfications.length !== 0 &&
                          allNotitfications.map((not) => {
                            return (
                              <ListItem
                                style={{ marginTop: "2rem", display: "grid" }}
                                severity="info"
                              >
                                <Typography>{not.text}</Typography>
                                <Link onClick={() => handleUpdate(not._id, not.type)}>mark as read</Link>
                              </ListItem>
                            );
                          })}
                      </List>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Search;
