import React, { useEffect, useState } from "react";
import api from "../api/index";
import List from "@material-ui/core/List";
import "./Pastes.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import Tags from './Tags'

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
  },
}));


export default function Pastes({ paste }) {
  const [expanded, setExpanded] = useState(false); //set the state of the accordion
  const classes = useStyles();
  const [pastes, setPastes] = useState([]);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <div className="ticket">
        <div className="section_1">
          <Accordion
            expanded={expanded === paste._id}
            onChange={handleChange(paste._id)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Grid container alignItems="center">
                <Grid item>
                  <Typography gutterBottom variant="h6">
                    {paste.Title}
                  </Typography>
                </Grid>
                {/* <Grid item xs>
                      {ticket.updated === true && <CheckCircleOutlineIcon />}
                    </Grid> */}
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <List className={classes.root}>
                <Typography color="textSecondary" variant="body2">
                  {paste.Content}
                </Typography>
              </List>
            </AccordionDetails>
          </Accordion>
        </div>
        <Grid container alignItems="center">
          <Grid item xs>
            
            <Typography gutterBottom>
              
              {`by ${paste.Author} | ${paste.Date}`}
            </Typography>
          </Grid>
          <Grid item>
            {/* <Typography gutterBottom variant="h6">
                  <IconButton
                    classes={{ root: "hideTicketButton" }}
                    onClick={() => hideTicket(ticket)}
                    title="hide"
                  >
                    <VisibilityOffIcon />
                  </IconButton>
                </Typography> */}
          </Grid>
        </Grid>
        <div className="status">
              <Grid container alignItems="center">
               { paste.Lables !== undefined && 
                <Grid item>
                  {paste.Lables.length !== 0 && (
                    <Tags className="labels" tags={paste.Lables} />
                  )}
                </Grid>
               }
              </Grid>
            </div> 
      </div>
    </div>
  );
}
