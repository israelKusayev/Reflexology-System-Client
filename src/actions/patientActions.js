import axios from 'axios';
import { tokenConfig } from './authActions';
import {
  ADD_PATIENT_SUCCESS,
  ADD_PATIENT_FAILED,
  REQUEST_FETCH,
  GET_PATIENT_SUCCESS,
  GET_PATIENT_FAILED,
  EDIT_PATIENT_SUCCESS,
  EDIT_PATIENT_FAILED,
  SET_CURRENT_PATINET
} from '../constants/actionTypes';
import { clearErrors, setError } from './errorActions';
import history from '../utils/history';

// Add patient
export const addPatient = patient => (dispatch, getState) => {
  dispatch({ type: REQUEST_FETCH });
  return axios
    .post('/api/patients', patient, tokenConfig(getState().auth.token))
    .then(res => {
      dispatch({ type: ADD_PATIENT_SUCCESS, payload: res.data });
      dispatch(clearErrors());
      history.push('/patients');
    })
    .catch(({ response }) => {
      dispatch({ type: ADD_PATIENT_FAILED });
      dispatch(setError(response.data.msg, response.status));
    });
};

// Edit an existing patient
export const editPatient = patient => (dispatch, getState) => {
  dispatch({ type: REQUEST_FETCH });
  return axios
    .put('/api/patients', patient, tokenConfig(getState().auth.token))
    .then(res => {
      dispatch({ type: EDIT_PATIENT_SUCCESS, payload: res.data });
      dispatch(clearErrors());
      history.push('/patients');
    })
    .catch(({ response }) => {
      dispatch({ type: EDIT_PATIENT_FAILED });
      dispatch(setError(response.data.msg, response.status));
    });
};

// Get all Patients in db
export const getPatients = () => (dispatch, getState) => {
  dispatch({ type: REQUEST_FETCH });
  return axios
    .get('/api/patients', tokenConfig(getState().auth.token))
    .then(res => {
      dispatch({ type: GET_PATIENT_SUCCESS, payload: res.data });
    })
    .catch(({ response }) => {
      dispatch({ type: GET_PATIENT_FAILED });
    });
};

export const setCurrentPatient = currentPatient => {
  return {
    type: SET_CURRENT_PATINET,
    payload: { currentPatient }
  };
};
