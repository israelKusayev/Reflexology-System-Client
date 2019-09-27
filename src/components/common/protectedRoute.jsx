import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withGlobalInitialization from '../../HOC/withGlobalInitialization';

export const ProtectedRoute = ({ component: Component, render, token, ...rest }) => {
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

const enhance = compose(
  withGlobalInitialization,
  connect(mapStateToProps),
  React.memo
);

export default enhance(ProtectedRoute);
