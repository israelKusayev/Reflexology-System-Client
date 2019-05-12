import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import { getInitialState, saveState } from './localStorage';
const Middlewares = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  getInitialState(),
  composeEnhancers(applyMiddleware(...Middlewares))
);

store.subscribe(() =>
  saveState({
    patients: store.getState().patients,
    treatments: store.getState().treatments,
    auth: { token: store.getState().auth.token }
  })
);

export default store;
