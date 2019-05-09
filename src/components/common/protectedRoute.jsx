import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRoute = ({ component: Component, render, token, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!token)
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};
const mapStateToProps = state => ({
  token: state.auth.token
});

export default connect(mapStateToProps)(ProtectedRoute);
