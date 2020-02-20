import { AppBar, Button, Drawer, IconButton, Toolbar, Typography } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import { Menu as MenuIcon } from "@material-ui/icons";
import React from "react";
import ReactDOM from "react-dom";
import Sidebar from './components/Sidebar';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  }
}));

function App() {
  const classes = useStyles();

  const [drawerState, setDrawerState] = React.useState(false);

  return (
    <React.Fragment>
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

      <h1>Welcome</h1>
    </React.Fragment>
  );
}

ReactDOM.render(<App />, document.querySelector("#app"));
