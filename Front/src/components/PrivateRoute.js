import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  childComponent: ChildComponent,
  title,
  authenticated,
  exact,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      authenticated ? (
        <Component title={title}>
          {ChildComponent ? <ChildComponent /> : null}
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
  childComponent: PropTypes.func,
  authenticated: PropTypes.bool.isRequired
};

export default PrivateRoute;
