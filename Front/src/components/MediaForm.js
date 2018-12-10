import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { reduxForm } from "redux-form";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Field } from "redux-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { hideModal } from "../actions/toggleModal";
import { postMedia } from "../actions/media/postMedia";
import { editMedia } from "../actions/media/editMedia";
import { getSingleMedia } from "../actions/media/getSingleMedia";
import { emptyActiveMedia } from "../actions/media/emptyActiveMedia";
import { withRouter } from "react-router-dom";
import "video-react/dist/video-react.css";
import { Player } from "video-react";

const adaptFileEventToValue = delegate => e => {
  const file = e.target.files[0];
  delegate(file);
  changeFileInputLabel(file.name);
};

const changeFileInputLabel = (name = "") => {
  let fileLabel = document.querySelector("#fileNameLabel");
  fileLabel.textContent = name;
};

const fileUploadDivStyle = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center"
};

const FileInput = ({
  input: { value: omitValue, onChange, onBlur, ...inputProps },
  meta: omitMeta,
  ...props
}) => {
  return (
    <div style={fileUploadDivStyle}>
      <input
        onChange={adaptFileEventToValue(onChange)}
        onBlur={adaptFileEventToValue(onBlur)}
        type="file"
        {...inputProps}
        {...props}
        accept="video/mp4, image/*"
        style={{ display: "none" }}
        id="raised-button-file"
      />

      <label htmlFor="raised-button-file">
        <Button variant="contained" component="span">
          Upload
        </Button>
      </label>
      <p id="fileNameLabel">Please upload a file</p>
    </div>
  );
};

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
  },
  card: {
    width: "100%"
  },
  media: {
    height: 140,
    width: "100%"
  }
});

function MediaForm(props) {
  const renderTextField = field => {
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
  };

  const onSubmit = values => {
    let formData = new FormData();
    formData.append("file", values.file);
    formData.append("title", values.title);

    props.postMedia(formData);
    hideModalUrl();
  };

  const onEdit = values => {
    props.editMedia(values);
    hideModalUrl();
  };

  const hideModalUrl = () => {
    props.emptyActiveMedia();
    props.history.push("/media");
  };

  const getFileTypeFromFileName = filename => {
    const filenameArraySplitByDot = filename.split(".");
    const extension =
      filenameArraySplitByDot[filenameArraySplitByDot.length - 1];
    switch (extension.toLowerCase()) {
      case "mp4":
        return "VID";
      case "jpg":
      case "png":
        return "PIC";
      default:
        return null;
    }
  };

  const returnMediaViewer = (fileType, fileUrl) => {
    switch (fileType) {
      case "VID":
        return <Player playsInline src={fileUrl} />;
      case "PIC":
        return (
          <Card style={{ width: "100%" }}>
            <CardContent style={{ width: "100%" }}>
              <CardMedia
                style={{ height: "200px", width: "100%" }}
                image={fileUrl}
              />
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    const { match } = props;
    const mediaId = match.params.id;
    if (mediaId) {
      props.getSingleMedia(mediaId);
    }
  });

  const { handleSubmit, classes, match, initialValues } = props;
  let fileType = null;
  let mediaViewer = null;
  if (initialValues) {
    const { file } = initialValues;
    const { fileName, originalName } = file;
    const fileUrl = `http://localhost:8080/download?file=${fileName}`;
    fileType = getFileTypeFromFileName(originalName);
    mediaViewer = returnMediaViewer(fileType, fileUrl);
  }
  const mediaId = match.params.id;
  const uploadButton = !mediaId ? (
    <Field name="file" component={FileInput} />
  ) : null;

  return (
    <form
      className={classes.container}
      onSubmit={handleSubmit(!initialValues ? onSubmit : onEdit)}
    >
      <Field
        name="title"
        label="Media Name"
        helperText="Media name"
        placeholder="Video 1"
        stylingClass={classes.textField}
        component={renderTextField}
        type="text"
      />

      {uploadButton}

      {mediaViewer}

      <div className={classes.buttonContainer}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          {!mediaId ? "Create Media" : "Edit media"}
        </Button>
        <Button onClick={hideModalUrl} className={classes.button}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

MediaForm = reduxForm({
  form: "media-form"
})(MediaForm);

MediaForm.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    initialValues: state.media.active
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { hideModal, postMedia, editMedia, getSingleMedia, emptyActiveMedia },
    dispatch
  );
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(MediaForm))
);
