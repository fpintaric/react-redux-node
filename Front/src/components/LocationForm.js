import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { reduxForm } from "redux-form";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Field } from "redux-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { hideModal } from "../actions/toggleModal";
import { postLocation } from "../actions/postLocation";
import { withRouter } from "react-router-dom";

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  textField: {
    width: "100%",
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  },
  buttonContainer: {
    display: "flex"
  }
});

class LocationForm extends Component {
  constructor(props) {
    super(props);
    this.hideModalUrl = this.hideModalUrl.bind(this);
  }

  renderField(field) {
    return (
      <TextField
        className={field.stylingClass}
        label={field.label}
        helperText={field.helperText}
        placeholder={field.placeholder}
        variant="standard"
        margin="normal"
        {...field.input}
      />
    );
  }
  onSubmit(values) {
    this.props.postLocation(values);
  }
  hideModalUrl() {
    this.props.history.push("/locations");
  }

  render() {
    const { handleSubmit } = this.props;
    const { classes } = this.props;
    return (
      <form
        className={classes.container}
        onSubmit={handleSubmit(this.onSubmit.bind(this))}
      >
        <Field
          name="city"
          label="City"
          helperText="City the store is in"
          placeholder="New York"
          stylingClass={classes.textField}
          component={this.renderField}
          type="text"
        />
        <Field
          name="address"
          label="Address"
          helperText="Address of the store"
          placeholder="Broadway Boulevard 12a"
          stylingClass={classes.textField}
          component={this.renderField}
          type="text"
        />
        <div className={classes.buttonContainer}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Create Location
          </Button>
          <Button onClick={this.hideModalUrl} className={classes.button}>
            Cancel
          </Button>
        </div>
      </form>
    );
  }
}

LocationForm = reduxForm({
  form: "location-form"
})(LocationForm);

LocationForm.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ hideModal, postLocation }, dispatch);
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(withStyles(styles)(LocationForm))
);
