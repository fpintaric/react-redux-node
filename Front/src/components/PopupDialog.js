import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { bindActionCreators } from "redux";
import Modal from "@material-ui/core/Modal";
import { connect } from "react-redux";
import { hideModal } from "../actions/toggleModal";

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
});

class SimpleModal extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.props.isModalOpen}
        onClose={this.props.hideModal}
      >
        <div className={classes.paper}>{this.props.children}</div>
      </Modal>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
  isModalOpen: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    isModalOpen: state.modal.open
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ hideModal }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SimpleModal));
