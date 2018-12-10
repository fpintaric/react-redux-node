import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { toggleModal } from "../actions/toggleModal";
import { logout } from "../actions/login/logout";

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  grow: {
    flexGrow: 1
  }
});

function MenuAppBar(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const addNewLocation = currentPath => {
    props.history.push(`${currentPath}/new`);
  };
  const { classes, location } = props;
  const currentPath = location.pathname.replace("/", "");
  const buttonText = currentPath.split("/")[0];
  const open = Boolean(anchorEl);

  return (
    <AppBar position="absolute" className={classes.appBar}>
      <Toolbar>
        <Typography
          className={classes.grow}
          variant="h6"
          color="inherit"
          noWrap
        >
          React/Redux/Node
        </Typography>
        <Button color="inherit" onClick={() => addNewLocation(currentPath)}>
          {"Add " + buttonText}
        </Button>
        <IconButton
          aria-owns={open ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={props.logout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ toggleModal, logout }, dispatch);
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(MenuAppBar));
