import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { toggleModal } from "../actions/toggleModal";

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  grow: {
    flexGrow: 1
  }
});

class MenuAppBar extends React.Component {
  render() {
    const { classes } = this.props;

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
          <Button color="inherit" onClick={this.props.toggleModal}>
            Add
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ toggleModal }, dispatch);
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(MenuAppBar));
