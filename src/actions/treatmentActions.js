import axios from 'axios';
import { tokenConfig } from './authActions';
import {
  ADD_TREATMENT_SUCCESS,
  ADD_TREATMENT_FAILED,
  REQUEST_FETCH,
  GET_TREATMENTS_SUCCESS,
  GET_TREATMENTS_FAILED,
  REMOVE_TREATMENT,
  EDIT_TREATMENT_SUCCESS,
  EDIT_TREATMENT_FAILED
} from '../constants/actionTypes';
import { clearErrors, setError } from './errorActions';
import history from '../utils/history';

// Add treatment to patinet
export const addTreatment = treatment => (dispatch, getState) => {
  dispatch({ type: REQUEST_FETCH });
  return axios
    .post('/api/treatments', treatment, tokenConfig(getState().auth.token))
    .then(res => {
      dispatch({ type: ADD_TREATMENT_SUCCESS, payload: res.data });
      dispatch(clearErrors());
      history.push('/treatments/' + treatment.patientId);
    })
    .catch(({ response }) => {
      dispatch({ type: ADD_TREATMENT_FAILED });
      dispatch(setError(response.data.msg, response.status));
    });
};

// Edit an existing treatment
export const editTreatment = treatment => (dispatch, getState) => {
  dispatch({ type: REQUEST_FETCH });
  return axios
    .put('/api/treatments', treatment, tokenConfig(getState().auth.token))
    .then(res => {
      dispatch({ type: EDIT_TREATMENT_SUCCESS, payload: res.data });
      dispatch(clearErrors());
      history.push('/treatments/' + treatment.patientId);
    })
    .catch(({ response }) => {
      dispatch({ type: EDIT_TREATMENT_FAILED });
      dispatch(setError(response.data.msg, response.status));
    });
};

// Get all patient's treatments
export const getTreatments = clientId => (dispatch, getState) => {
  dispatch({ type: REQUEST_FETCH });
  return axios
    .get('/api/treatments/' + clientId, tokenConfig(getState().auth.token))
    .then(res => {
      dispatch({ type: GET_TREATMENTS_SUCCESS, payload: res.data });
    })
    .catch(({ response }) => {
      dispatch({ type: GET_TREATMENTS_FAILED });
    });
};

// Remove patinet treatment
export const removeTreatmnets = () => ({ type: REMOVE_TREATMENT });
