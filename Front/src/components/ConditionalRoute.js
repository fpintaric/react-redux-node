import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

const ConditionalRoute = ({
  component: Component,
  childComponent: ChildComponent,
  title,
  condition,
  redirect,
  exact,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      condition ? (
        <Component title={title}>
          {ChildComponent ? <ChildComponent /> : null}
        </Component>
      ) : (
        <Redirect
          to={{
            pathname: redirect,
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

ConditionalRoute.propTypes = {
  component: PropTypes.func.isRequired,
  childComponent: PropTypes.func,
  condition: PropTypes.bool.isRequired,
  redirect: PropTypes.string.isRequired
};

export default ConditionalRoute;
