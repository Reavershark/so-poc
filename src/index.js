import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import {
  AppBar,
  CssBaseline,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Container
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";

import { makeStyles } from "@material-ui/core/styles";
import Sidebar from "./components/Sidebar";

// Pages
import Home from "./pages/Home";
import Terminal from "./pages/Terminal";
import Error from "./pages/Error";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  }
}));

function App() {
  const classes = useStyles();

  const [drawerState, setDrawerState] = React.useState(false);

  return (
    <BrowserRouter>
      <CssBaseline />

      <AppBar position="static">
        <Toolbar>
          {/* Left */}
          <IconButton
            onClick={() => setDrawerState(true)}
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Menu</Typography>

          <div className={classes.grow} />

          {/* Right */}
          <Button color="inherit">Right</Button>
        </Toolbar>
      </AppBar>

      <Drawer open={drawerState} onClose={() => setDrawerState(false)}>
        <div
          className={classes.list}
          role="presentation"
          onClick={() => setDrawerState(false)}
          onKeyDown={() => setDrawerState(false)}
        >
          <Sidebar />
        </div>
      </Drawer>

      <Container>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route path="/home" component={Home} />
          <Route path="/terminal" component={Terminal} />
          <Route component={Error} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.querySelector("#app"));
