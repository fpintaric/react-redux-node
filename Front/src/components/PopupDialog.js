import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { bindActionCreators } from "redux";
import Modal from "@material-ui/core/Modal";
import { connect } from "react-redux";
import { hideModal } from "../actions/toggleModal";
import { withRouter } from "react-router-dom";

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
  constructor(props) {
    super(props);
    this.hideModal = this.hideModal.bind(this);
  }

  hideModal() {
    this.props.history.push("/locations");
  }

  render() {
    const { classes } = this.props;

    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open
        onClose={this.hideModal}
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(SimpleModal))
);
