import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { reduxForm } from "redux-form";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Field } from "redux-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { hideModal } from "../actions/toggleModal";
import { postMedia } from "../actions/media/postMedia";
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
        accept="image/*"
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
    formData.append("file", values.file);
    formData.append("title", values.title);

    this.props.postMedia(formData);
    this.hideModalUrl();
  }

  hideModalUrl() {
    this.props.emptyActiveMedia();
    this.props.history.push("/media");
  }

  componentDidMount = () => {
    const { match } = this.props;
    const mediaId = match.params.id;
    if (mediaId) {
      this.props.getSingleMedia(mediaId);
    }
  };

  render() {
    const { handleSubmit } = this.props;
    const { classes } = this.props;
    return (
      <form
        className={classes.container}
        onSubmit={handleSubmit(this.onSubmit.bind(this))}
      >
        <Field
          name="title"
          label="Media Name"
          helperText="Media name"
          placeholder="Video 1"
          stylingClass={classes.textField}
          component={this.renderTextField}
          type="text"
        />
        <Field name="file" component={FileInput} />

        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              src="http://localhost:8080/download"
              title="Media"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Lizard
              </Typography>
              <Typography component="p">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Player playsInline src="http://localhost:8080/download" />

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

const mapStateToProps = state => {
  return {
    initialValues: state.media.active
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { hideModal, postMedia, getSingleMedia, emptyActiveMedia },
    dispatch
  );
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(MediaForm))
);
