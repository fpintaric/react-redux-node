import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { getLocations } from "../actions/getLocations";

const styles = {
  table: {
    minWidth: "auto"
  }
};

class LocationsList extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  componentDidMount = () => {
    this.props.getLocations();
  };

  render() {
    console.log("rendering with props...", this.props);
    const { classes, locations } = this.props;

    return locations ? (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>City</TableCell>
            <TableCell>Address</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {locations.map(location => {
            return (
              <TableRow key={location._id}>
                <TableCell component="th" scope="row">
                  {location.city}
                </TableCell>
                <TableCell>{location.address}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    ) : (
      <div>Loading...</div>
    );
  }
}

const mapStateToProps = state => {
  return {
    locations: state.locations.all
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getLocations }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LocationsList));
