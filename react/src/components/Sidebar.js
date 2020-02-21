import { Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Home as HomeIcon, SettingsEthernet as TerminalIcon } from "@material-ui/icons";
import React from "react";

function Sidebar() {
  return (
    <React.Fragment>
      <Typography variant="h4" align="center">
        Menu
      </Typography>
      <Divider />
      <List>
        <ListItem button component={Link} to="/home">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/terminal">
          <ListItemIcon>
            <TerminalIcon />
          </ListItemIcon>
          <ListItemText primary="Terminal" />
        </ListItem>
      </List>
    </React.Fragment>
  );
}

export default Sidebar;
