import React from 'react';
import { Router } from 'react-router-dom';
import history from './utils/history';
import { Provider } from 'react-redux';
import store from './store/store';

const Root = ({ children, initialState = undefined }) => (
  <Provider store={store(initialState)}>
    <Router history={history}>{children}</Router>
  </Provider>
);

export default Root;
