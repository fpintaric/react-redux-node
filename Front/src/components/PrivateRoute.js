import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  childComponent: ChildComponent,
  authenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      authenticated ? (
        <Component>
          <ChildComponent />
        </Component>
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

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  childComponent: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired
};

export default PrivateRoute;
