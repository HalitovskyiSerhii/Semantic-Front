/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const Route = ({ component: Component, isAuthorized, ...rest }) => (
  <Route
    {...rest}
    render={props => (isAuthorized
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />)}
  />
);

Route.propTypes = {
  component: PropTypes.any.isRequired, // eslint-disable-line
  location: PropTypes.any // eslint-disable-line
};

Route.defaultProps = {
  location: undefined
};

export default Route;
