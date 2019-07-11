import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import { getInitialState, saveState } from './localStorage';

const Middlewares = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default initialState => {
  const store = createStore(
    rootReducer,
    initialState || getInitialState(),
    composeEnhancers(applyMiddleware(...Middlewares))
  );

  store.subscribe(() =>
    saveState({
      auth: { token: store.getState().auth.token },
      patients: { patients: [], currentPatient: store.getState().patients.currentPatient }
    })
  );
  return store;
};
