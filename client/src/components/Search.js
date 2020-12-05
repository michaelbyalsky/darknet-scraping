import React, { useEffect, useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import SearchIcon from "@material-ui/icons/Search";
import ChooseLabels from "./Lables";
import NotificationImportantIcon from "@material-ui/icons/NotificationImportant";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MuiAlert from "@material-ui/lab/Alert";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import api from "../api/index";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import moment from "moment";
import { Link as RLink } from 'react-router-dom'

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
    marginRigth: -1,
    width: "400px",
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
  handleChange,
  pastes,
  setPastes,
  allNotitfications,
  keyword1,
  options,
  setOptions,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [newKeyWord, setNewKeyword] = React.useState("");
  const [lables, setLables] = useState([]);

  const getKeyWord = async () => {
    try {
      const { data } = await api.getPastes("/pastes/keyword");
      const obj = data.map((label) => {
        return { value: label.name, label: label.name };
      });
      obj.push({ value: "All", label: "All" });
      setOptions(obj);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getKeyWord();
  }, []);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClickOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
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

  const handleAddKeyword = async () => {
    try {
      setModalOpen(false);
      await api.create("/pastes/keyword", { name: newKeyWord });
      setNewKeyword("");
      getKeyWord();
    } catch (err) {
      console.error(err);
    }
  };

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
          return not._id !== id;
        });
        setAllNotitfications(filtered);
      } else {
        await api.update("/logs", { _id: id });
      }
      const filtered = allNotitfications.filter((not) => {
        return not._id !== id;
      });
      setAllNotitfications(filtered);
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
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div sytle={{ width: "100px" }}></div>
          <div />
          <div id="buttons" className={classes.buttons2}>
            <ChooseLabels
              lables={lables}
              setLables={setLables}
              options={options}
              setOptions={setOptions}
              pastes={pastes}
              setPastes={setPastes}
            />
          </div>
          <div>
            <Dialog
              open={modalOpen}
              onClose={handleModalClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Add keyword</DialogTitle>
              <DialogContent>
                <DialogContentText>add a new keyword</DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="new keyword"
                  type="text"
                  fullWidth
                  onChange={(e) => setNewKeyword(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleModalClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleAddKeyword} color="primary">
                  Add
                </Button>
              </DialogActions>
            </Dialog>
          </div>

          <div id="buttons" className={classes.buttons1}>
            <Button onClick={handleClickOpen}>add keyword</Button>
          <Button><RLink to='statistics'>Dasboard</RLink></Button>
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
            {allNotitfications.length !== 0 && (
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
                        <List
                          autoFocusItem={open}
                          onKeyDown={handleListKeyDown}
                        >
                          {allNotitfications.length !== 0 &&
                            allNotitfications.map((not) => {
                              return (
                                <ListItem
                                  style={{ marginTop: "2rem", display: "grid" }}
                                  severity="info"
                                >
                                  <Typography>{not.text}</Typography>
                                  <Typography>
                                    {moment(not.date).format(
                                      "DD-MM-YY, hh:mm A"
                                    )}
                                  </Typography>
                                  <Typography>{not.Title}</Typography>
                                  <Link
                                    onClick={() =>
                                      handleUpdate(not._id, not.type)
                                    }
                                  >
                                    mark as read
                                  </Link>
                                </ListItem>
                              );
                            })}
                        </List>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Search;
