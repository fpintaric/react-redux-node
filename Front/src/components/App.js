import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router, withRouter } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ContentContainer from "./ContentContainer";
import LocationsList from "./LocationsList";
import PrivateRoute from "./PrivateRoute";

const styles = () => ({
  root: {
    flexGrow: 1,
    height: "100vh",
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex"
  }
});

const NavbarWithRouter = withRouter(Navbar);

class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <CssBaseline>
        <Router>
          <div className={classes.root}>
            <NavbarWithRouter />
            <Sidebar />
            <PrivateRoute
              path="/locations"
              authenticated={this.props.authenticated}
              component={ContentContainer}
              childComponent={LocationsList}
            />
          </div>
        </Router>
      </CssBaseline>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated
  };
};

export default connect(mapStateToProps)(withStyles(styles)(App));
