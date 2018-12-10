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

import SimpleModal from "./PopupDialog";
import ConditionalRoute from "./ConditionalRoute";

import { getLocations } from "../actions/locations/getLocations";
import { deleteLocation } from "../actions/locations/deleteLocation";
import LocationForm from "./LocationForm";

const styles = {
  table: {
    minWidth: "auto"
  },
  hoverHand: {
    cursor: "pointer"
  }
};

const LocationItem = ({
  id,
  city,
  address,
  deleteHandler,
  editLocationHandler
}) => (
  <TableRow
    style={{ cursor: "pointer" }}
    onClick={() => editLocationHandler(id)}
  >
    <TableCell component="th" scope="row">
      {city}
    </TableCell>
    <TableCell>{address}</TableCell>
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

function LocationsList(props) {
  const { classes, locations, authenticated } = props;
  useEffect(() => {
    props.getLocations();
  }, []);

  const deleteLocationHandler = locationId => {
    props.deleteLocation(locationId);
  };

  const editLocationHandler = locationId => {
    const currentPath = props.location.pathname.replace("/", "");
    props.history.push(`${currentPath}/${locationId}`);
  };

  const renderLocations = locations => {
    let rows = [];
    for (let key in locations) {
      let location = locations[key];
      rows.push(
        <LocationItem
          key={location._id}
          id={location._id}
          city={location.city}
          address={location.address}
          deleteHandler={deleteLocationHandler}
          editLocationHandler={editLocationHandler}
        />
      );
    }
    return rows;
  };
  return locations ? (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>City</TableCell>
          <TableCell>Address</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>{renderLocations(locations, classes)}</TableBody>
      <Switch>
        <ConditionalRoute
          exact
          path="/locations/new"
          title="Create a new location"
          condition={authenticated}
          redirect="/login"
          component={SimpleModal}
          childComponent={LocationForm}
        />
        <ConditionalRoute
          path="/locations/:id"
          title="Edit location"
          condition={authenticated}
          redirect="/login"
          component={SimpleModal}
          childComponent={LocationForm}
        />
      </Switch>
    </Table>
  ) : (
    <div>Loading...</div>
  );
}

LocationsList.propTypes = {
  classes: PropTypes.object.isRequired,
  locations: PropTypes.object
};

const mapStateToProps = state => {
  return {
    locations: state.locations.all,
    authenticated: state.auth.authenticated
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getLocations, deleteLocation }, dispatch);
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(LocationsList))
);
