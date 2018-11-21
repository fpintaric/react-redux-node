import React from "react";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { closeSnackbar } from "../actions/ui/closeSnackbar";

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
  const { classes, snackBarOpened, snackBarMessage, closeSnackbar } = props;
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {props.children}
      <div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={snackBarOpened}
          onClose={closeSnackbar}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{snackBarMessage}</span>}
        />
      </div>
    </main>
  );
}

ContentContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired
};

const mapStateToProps = state => {
  return {
    snackBarOpened: state.ui.snackbar.open,
    snackBarMessage: state.ui.snackbar.message
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ closeSnackbar }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ContentContainer));
