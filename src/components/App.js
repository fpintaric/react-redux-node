import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ContentContainer from "./ContentContainer";
import { exampleAction } from "../actions/example_action";

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

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;

    return (
      <CssBaseline>
        <Router>
          <div className={classes.root}>
            <Navbar />
            <Sidebar />
            <PrivateRoute
              path="/content"
              authenticated={this.props.authenticated}
              component={ContentContainer}
            />
          </div>
        </Router>
      </CssBaseline>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ exampleAction }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App));
