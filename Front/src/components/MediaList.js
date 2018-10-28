import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

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

const MediaItem = ({ id, city, address, deleteHandler, editHandler }) => (
  <TableRow style={{ cursor: "pointer" }}>
    <TableCell component="th" scope="row">
      {city}
    </TableCell>
    <TableCell>{address}</TableCell>
    <TableCell>
      <DeleteForeverIcon onClick={() => deleteHandler(id)} />
    </TableCell>
  </TableRow>
);

class MediaList extends Component {
  render() {
    const { classes, media } = this.props;
    return true ? (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <PrivateRoute
          path="/media/new"
          authenticated={true}
          component={SimpleModal}
          childComponent={MediaForm}
        />
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
  return {};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(MediaList))
);
