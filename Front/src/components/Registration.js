import React, { Component } from "react";
import { bindActionCreators } from "redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { Field } from "redux-form";
import { reduxForm } from "redux-form";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { registrationRequest } from "../actions/registration/registrationRequest";

const styles = theme => ({
  loginRootDiv: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  textField: {
    width: "30%",
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  title: {
    fontSize: "36px"
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

const renderTextField = field => {
  return (
    <TextField
      label={field.label}
      className={field.stylingClass}
      type={field.type}
      margin="normal"
      variant="outlined"
      error={field.meta.touched === true && field.meta.error != null}
      {...field.input}
    />
  );
};

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = "Required";
  }
  if (!values.password) {
    errors.password = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  }
  return errors;
};

class Registration extends Component {
  onSubmit(values) {
    this.props.authenticationRequest(values);
  }

  render() {
    const { classes, handleSubmit } = this.props;

    return (
      <div className={classes.loginRootDiv}>
        <p className={classes.title}>Registration</p>
        <form
          className={classes.form}
          onSubmit={handleSubmit(this.onSubmit.bind(this))}
        >
          <Field
            name="username"
            label="Username"
            stylingClass={classes.textField}
            component={renderTextField}
            type="text"
          />
          <Field
            name="email"
            label="E-Mail"
            stylingClass={classes.textField}
            component={renderTextField}
            type="text"
          />
          <Field
            name="password"
            label="Password"
            stylingClass={classes.textField}
            component={renderTextField}
            type="password"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Register
          </Button>
        </form>
        <Button
          component={Link}
          to="/login"
          type="button"
          variant="contained"
          color="default"
          className={classes.button}
        >
          Login
        </Button>
      </div>
    );
  }
}

Registration.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ registrationRequest }, dispatch);
};

Registration = reduxForm({
  form: "login-form",
  validate
})(Registration);

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(Registration));
