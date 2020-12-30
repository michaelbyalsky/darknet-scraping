import React,{useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";
import ByName from "./ByName";
import ByDate from "./ByDate";
import ByLables from "./ByLables";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  main: {
      display: 'grid',
      justifyContent: 'center',
  }
}));

export default function Statistics() {
const [showImage, setShowImage] = useState(false)
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <HomeIcon />
            </IconButton>
          </Link>
          <Typography variant="h6" className={classes.title}>
            Dark Statistics
          </Typography>
          <Button color="inherit"></Button>
        </Toolbar>
      </AppBar>
      <div className={classes.main}>
        <div>
          <ByName />
        </div>
        <div>
          <div>
            <ByLables />
          <Button onClick={() => setShowImage((oldState) => !oldState)} color="inherit">show explanantion</Button>  
          </div>
          {showImage && 
          <div>
            <img src="https://miro.medium.com/max/511/0*SqZbOvfNIdPsuVh3.png" />
          </div>
          }
        </div>
        <div>
          <ByDate />
        </div>
      </div>
    </div>
  );
}
