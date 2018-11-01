import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { reduxForm } from "redux-form";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Field } from "redux-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { hideModal } from "../actions/toggleModal";
import { withRouter } from "react-router-dom";

const adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);

const FileInput = ({
  input: { value: omitValue, onChange, onBlur, ...inputProps },
  meta: omitMeta,
  ...props
}) => (
  <input
    onChange={adaptFileEventToValue(onChange)}
    onBlur={adaptFileEventToValue(onBlur)}
    type="file"
    {...inputProps}
    {...props}
  />
);

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

class MediaForm extends Component {
  constructor(props) {
    super(props);
    this.hideModalUrl = this.hideModalUrl.bind(this);
  }

  renderTextField(field) {
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
    let formData = new FormData();
    formData.append("mediaFile", values.picVidInput);
    formData.append("mediaName", values.mediaName);
    var config = {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress: function(progressEvent) {
        let percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(percentCompleted);
      }
    };

    axios
      .post("http://localhost:8080/media", formData, config)
      .then(response => {
        console.log(response);
        this.hideModalUrl();
      })
      .catch(error => console.log(error));
  }
  hideModalUrl() {
    this.props.history.push("/media");
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
          name="mediaName"
          label="Media Name"
          helperText="Media name"
          placeholder="Video 1"
          stylingClass={classes.textField}
          component={this.renderTextField}
          type="text"
        />
        <Field name="picVidInput" component={FileInput} />

        <div className={classes.buttonContainer}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Create Media entry
          </Button>
          <Button onClick={this.hideModalUrl} className={classes.button}>
            Cancel
          </Button>
        </div>
      </form>
    );
  }
}

MediaForm = reduxForm({
  form: "media-form"
})(MediaForm);

MediaForm.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ hideModal }, dispatch);
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(withStyles(styles)(MediaForm))
);
