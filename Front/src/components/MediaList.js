import React, { useEffect } from "react";
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
import ConditionalRoute from "./ConditionalRoute";

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

function MediaList(props) {
  useEffect(() => {
    props.getAllMedia();
  }, []);

  const deleteMediaHandler = mediaId => {
    props.deleteMedia(mediaId);
  };

  const editMediaHandler = mediaId => {
    const currentPath = props.location.pathname.replace("/", "");
    props.history.push(`${currentPath}/${mediaId}`);
  };

  const renderMedia = medias => {
    let rows = [];
    for (let key in medias) {
      let media = medias[key];
      rows.push(
        <MediaItem
          key={media._id}
          id={media._id}
          title={media.title}
          deleteHandler={deleteMediaHandler}
          editMediaHandler={editMediaHandler}
        />
      );
    }
    return rows;
  };

  const { classes, media, authenticated } = props;
  return true ? (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Title</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>{renderMedia(media)}</TableBody>
      <Switch>
        <ConditionalRoute
          path="/media/new"
          condition={authenticated}
          redirect="/login"
          component={SimpleModal}
          childComponent={MediaForm}
        />
        <ConditionalRoute
          path="/media/:id"
          title="Edit media"
          condition={authenticated}
          redirect="/login"
          component={SimpleModal}
          childComponent={MediaForm}
        />
      </Switch>
    </Table>
  ) : (
    <div>Loading...</div>
  );
}

MediaList.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    media: state.media.all,
    authenticated: state.auth.authenticated
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
