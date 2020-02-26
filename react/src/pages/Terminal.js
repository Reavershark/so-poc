import React from "react";
import { Grid, Paper, Typography, Box } from "@material-ui/core";
import Iframe from "react-iframe";
import { makeStyles } from "@material-ui/core/styles";

const gottys = {
  so_master: ""
};

const useStyles = makeStyles(theme => ({
  tile: {
    padding: "16px"
  }
}));

function TerminalFrame(props) {
  return (
    <Iframe
      url={props.url}
      width="100%"
      height="400px"
      id="myId"
      className="myClassname"
      display="initial"
      position="relative"
      style={{ padding: 20 }}
    />
  );
}

function Terminal() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <h1>Terminal</h1>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={classes.tile}>
            <Typography variant="h6">security-onion</Typography>
            <TerminalFrame url="/gotty-so" />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.tile}>
            <Typography variant="h6">hypervisor</Typography>
            <TerminalFrame url="/gotty-host" />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Terminal;
