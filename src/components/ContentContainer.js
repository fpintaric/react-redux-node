import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0
  },
  toolbar: theme.mixins.toolbar
});

function ContentContainer(props) {
  const { classes } = props;

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {props.children}
    </main>
  );
}

ContentContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ContentContainer);
