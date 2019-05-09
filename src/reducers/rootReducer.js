import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import loadingReducer from './loadingReducer';
import patientsReducer from './patientsReducer';
import treatmentReducer from './treatmentsReducer';
import { LOGOUT, SYNC } from '../constants/actionTypes';
import { STORE_KEY } from '../constants/localStorageConstants';

const appReducer = combineReducers({
  auth: authReducer,
  patients: patientsReducer,
  treatments: treatmentReducer,
  error: errorReducer,
  loading: loadingReducer
});

export default (state, action) => {
  if (action.type === LOGOUT) {
    localStorage.clear();
    state = undefined;
  }
  if (action.type === SYNC) {
    state = undefined;
    localStorage.removeItem(STORE_KEY);
  }
  return appReducer(state, action);
};
