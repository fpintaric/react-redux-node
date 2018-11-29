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
import { postLocation } from "../actions/locations/postLocation";
import { editLocation } from "../actions/locations/editLocation";
import { getLocation } from "../actions/locations/getLocation";
import { emptyActiveLocation } from "../actions/locations/emptyActiveLocation";
import { openSnackbar } from "../actions/ui/openSnackbar";
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

const validate = values => {
  const errors = {};
  if (!values.address) {
    errors.address = "Required";
  }
  if (!values.city) {
    errors.city = "Required";
  }
  return errors;
};

const renderField = field => {
  return (
    <TextField
      className={field.stylingClass}
      label={field.label}
      helperText={field.helperText}
      placeholder={field.placeholder}
      error={field.meta.touched === true && field.meta.error != null}
      variant="standard"
      margin="normal"
      {...field.input}
    />
  );
};

class LocationForm extends Component {
  constructor(props) {
    super(props);
    this.hideModalUrl = this.hideModalUrl.bind(this);
  }

  onSubmit(values) {
    this.props.postLocation(values);
    this.hideModalUrl();
    this.props.openSnackbar("Location added");
  }

  onEdit(values) {
    this.props.editLocation(values);
    this.hideModalUrl();
  }

  hideModalUrl() {
    this.props.emptyActiveLocation();
    this.props.history.push("/locations");
  }

  componentDidMount = () => {
    const { match } = this.props;
    const locationId = match.params.id;
    if (locationId) {
      this.props.getLocation(locationId);
    }
  };

  render() {
    const { handleSubmit, classes, initialValues } = this.props;
    return (
      <form
        className={classes.container}
        onSubmit={handleSubmit(
          !initialValues ? this.onSubmit.bind(this) : this.onEdit.bind(this)
        )}
      >
        <Field
          name="city"
          label="City"
          helperText="City the store is in"
          placeholder="New York"
          stylingClass={classes.textField}
          component={renderField}
          type="text"
        />
        <Field
          name="address"
          label="Address"
          helperText="Address of the store"
          placeholder="Broadway Boulevard 12a"
          stylingClass={classes.textField}
          component={renderField}
          type="text"
        />
        <div className={classes.buttonContainer}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            {!initialValues ? "Create Location" : "Edit location"}
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
  form: "location-form",
  validate
})(LocationForm);

LocationForm.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      hideModal,
      postLocation,
      editLocation,
      getLocation,
      emptyActiveLocation,
      openSnackbar
    },
    dispatch
  );
};

const mapStateToProps = state => {
  return {
    initialValues: state.locations.active
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(LocationForm))
);
