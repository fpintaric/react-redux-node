import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Router, withRouter, Switch } from "react-router-dom";
import { history } from "../_helpers/history";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Login from "./Login";
import ContentContainer from "./ContentContainer";
import LocationsList from "./LocationsList";
import MediaList from "./MediaList";
import ConditionalRoute from "./ConditionalRoute";

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
    const { classes, authenticated } = this.props;

    const MainContent = () => (
      <div className={classes.root}>
        <NavbarWithRouter />
        <Sidebar />
        <ConditionalRoute
          path="/locations"
          condition={authenticated}
          redirect="/login"
          component={ContentContainer}
          childComponent={LocationsList}
        />
        <ConditionalRoute
          path="/media"
          condition={authenticated}
          redirect="/login"
          component={ContentContainer}
          childComponent={MediaList}
        />
      </div>
    );

    return (
      <CssBaseline>
        <Router history={history}>
          <div>
            <Switch>
              <ConditionalRoute
                path="/login"
                condition={!authenticated}
                redirect="/"
                component={Login}
              />
              <ConditionalRoute
                path="/"
                condition={authenticated}
                redirect="/login"
                component={MainContent}
              />
            </Switch>
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
