import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter, Switch } from "react-router-dom";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import { getAllMedia } from "../actions/media/getAllMedia";
import { deleteMedia } from "../actions/media/deleteMedia";

import SimpleModal from "./PopupDialog";
import PrivateRoute from "./PrivateRoute";

import MediaForm from "./MediaForm";

const styles = {
  table: {
    minWidth: "auto"
  },
  hoverHand: {
    cursor: "pointer"
  }
};

const MediaItem = ({ id, title, deleteHandler, editMediaHandler }) => (
  <TableRow style={{ cursor: "pointer" }} onClick={() => editMediaHandler(id)}>
    <TableCell component="th" scope="row">
      {title}
    </TableCell>
    <TableCell>
      <DeleteForeverIcon
        onClick={e => {
          e.stopPropagation();
          deleteHandler(id);
        }}
      />
    </TableCell>
  </TableRow>
);

class MediaList extends Component {
  constructor(props) {
    super(props);
    this.deleteMediaHandler = this.deleteMediaHandler.bind(this);
    this.editMediaHandler = this.editMediaHandler.bind(this);
  }

  componentDidMount = () => {
    this.props.getAllMedia();
  };

  deleteMediaHandler = mediaId => {
    this.props.deleteMedia(mediaId);
  };

  editMediaHandler = mediaId => {
    const currentPath = this.props.location.pathname.replace("/", "");
    this.props.history.push(`${currentPath}/${mediaId}`);
  };

  renderMedia = medias => {
    let rows = [];
    for (let key in medias) {
      let media = medias[key];
      rows.push(
        <MediaItem
          key={media._id}
          id={media._id}
          title={media.title}
          deleteHandler={this.deleteMediaHandler}
          editMediaHandler={this.editMediaHandler}
        />
      );
    }
    return rows;
  };

  render() {
    const { classes, media } = this.props;
    return true ? (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>{this.renderMedia(media)}</TableBody>
        <Switch>
          <PrivateRoute
            path="/media/new"
            authenticated={true}
            component={SimpleModal}
            childComponent={MediaForm}
          />
          <PrivateRoute
            path="/media/:id"
            title="Edit media"
            authenticated={true}
            component={SimpleModal}
            childComponent={MediaForm}
          />
        </Switch>
      </Table>
    ) : (
      <div>Loading...</div>
    );
  }
}

MediaList.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    media: state.media.all
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getAllMedia, deleteMedia }, dispatch);
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(MediaList))
);
