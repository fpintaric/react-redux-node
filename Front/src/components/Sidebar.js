import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PermMediaIcon from "@material-ui/icons/PermMedia";

import { NavLink } from "react-router-dom";

const drawerWidth = 240;

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true
  },
  noDecoration: {
    textDecoration: "none"
  }
});

function Sidebar(props) {
  const { classes } = props;

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.toolbar} />
      <List>
        <NavLink to="/locations" className={classes.noDecoration}>
          <ListItem button>
            <ListItemIcon>
              <LocationOnIcon />
            </ListItemIcon>
            <ListItemText primary="Locations" />
          </ListItem>
        </NavLink>
        <NavLink to="/media" className={classes.noDecoration}>
          <ListItem button>
            <ListItemIcon>
              <PermMediaIcon />
            </ListItemIcon>
            <ListItemText primary="Media" />
          </ListItem>
        </NavLink>
      </List>
      <Divider />
    </Drawer>
  );
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Sidebar);
