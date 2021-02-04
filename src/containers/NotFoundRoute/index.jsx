import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import NotFound from '../../scenes/NotFound';

const NotFoundRoute = ({ condition, redirectTo, ...rest }) => (
  <Route
    {...rest}
    render={props => (condition
      ? <Redirect to={{ pathname: redirectTo, state: { from: props.location } }} />
      : <Route path="*" exact component={NotFound} />)}
  />
);

NotFoundRoute.propTypes = {
  condition: PropTypes.bool,
  redirectTo: PropTypes.string,
  location: PropTypes.any // eslint-disable-line
};

NotFoundRoute.defaultProps = {
  condition: false,
  redirectTo: '/login',
  location: undefined
};

export default NotFoundRoute;
