import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import loadingReducer from './loadingReducer';
import patientsReducer from './patientsReducer';
import treatmentReducer from './treatmentsReducer';
import { LOGOUT } from '../constants/actionTypes';

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

  return appReducer(state, action);
};
