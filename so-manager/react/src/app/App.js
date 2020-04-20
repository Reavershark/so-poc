import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import {
  AppBar,
  CssBaseline,
  Drawer,
  Toolbar,
  Typography,
  Container,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import Sidebar from "./Sidebar";

// Pages
import { Home, Query, Terminal, Error } from "../pages";

const drawerWidth = 220;
const spacing = 3;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexshrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    padding: theme.spacing(spacing),
  },
  content: {
    flexgrow: 1,
    padding: theme.spacing(spacing),
  },
  toolbar: theme.mixins.toolbar,
  grow: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.root}>
        <CssBaseline />

        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            {/* Left */}
            <Typography variant="h6" noWrap>
              Security Onion PoC
            </Typography>

            <div className={classes.grow} />

            {/* Right */}
          </Toolbar>
        </AppBar>

        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <Sidebar />
        </Drawer>

        <Container className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route path="/home" component={Home} />
            <Route path="/query" component={Query} />
            <Route path="/terminal" component={Terminal} />
            <Route component={Error} />
          </Switch>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
