import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const RedirectionRoute = ({ component: Component, condition, redirectTo, ...rest }) => (
  <Route
    {...rest}
    render={props => (condition
      ? <Redirect to={{ pathname: redirectTo, state: { from: props.location } }} />
      : <Component {...props} />)}
  />
);

RedirectionRoute.propTypes = {
  condition: PropTypes.bool,
  redirectTo: PropTypes.string,
  component: PropTypes.any.isRequired, // eslint-disable-line
  location: PropTypes.any // eslint-disable-line
};

RedirectionRoute.defaultProps = {
  condition: false,
  location: undefined,
  redirectTo: '/'
};

export default RedirectionRoute;
