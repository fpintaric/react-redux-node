import React, { Component } from "react";
import { bindActionCreators } from "redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Field } from "redux-form";
import { reduxForm } from "redux-form";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { authenticationRequest } from "../actions/login/authenticationRequest";

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

class Login extends Component {
  renderTextField(field) {
    return (
      <TextField
        label={field.label}
        className={field.stylingClass}
        margin="normal"
        variant="outlined"
        {...field.input}
      />
    );
  }

  onSubmit(values) {
    console.log("pls");
    this.props.authenticationRequest(values);
  }

  render() {
    const { classes, handleSubmit } = this.props;

    return (
      <div className={classes.loginRootDiv}>
        <p className={classes.title}>Login</p>
        <form
          className={classes.form}
          onSubmit={handleSubmit(this.onSubmit.bind(this))}
        >
          <Field
            name="email"
            label="E-Mail"
            stylingClass={classes.textField}
            component={this.renderTextField}
            type="text"
          />
          <Field
            name="password"
            label="Password"
            stylingClass={classes.textField}
            component={this.renderTextField}
            type="text"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ authenticationRequest }, dispatch);
};

Login = reduxForm({
  form: "login-form"
})(Login);

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(Login));
