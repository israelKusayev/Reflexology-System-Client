import axios from 'axios';
import { tokenConfig } from './authActions';
import {
  GET_REMINDERS_SUCCESS,
  GET_REMINDERS_FAILED,
  REQUEST_FETCH,
  EDIT_REMINDER_SUCCESS,
  EDIT_REMINDER_FAILED,
  GET_REMINDERS_COUNT_SUCCESS,
  GET_REMINDERS_COUNT_FAILED,
  REQUEST_FETCH_WITHOUT_LOADER
} from '../constants/actionTypes';
import { clearErrors, setError } from './errorActions';

// get patients reminders
export const getReminders = filter => (dispatch, getState) => {
  dispatch({ type: REQUEST_FETCH_WITHOUT_LOADER });
  return axios
    .get('/api/reminders' + '?newReminders=' + filter, tokenConfig(getState().auth.token))
    .then(res => {
      dispatch({ type: GET_REMINDERS_SUCCESS, payload: res.data });
      dispatch(clearErrors());
    })
    .catch(({ response }) => {
      dispatch({ type: GET_REMINDERS_FAILED });
      dispatch(setError(response.data.msg, response.status));
    });
};

// get new reminders count
export const getRemindersCount = () => (dispatch, getState) => {
  dispatch({ type: REQUEST_FETCH_WITHOUT_LOADER });
  return axios
    .get('/api/reminders/newRemindersCount', tokenConfig(getState().auth.token))
    .then(res => {
      dispatch({ type: GET_REMINDERS_COUNT_SUCCESS, payload: res.data });
      dispatch(clearErrors());
    })
    .catch(({ response }) => {
      dispatch({ type: GET_REMINDERS_COUNT_FAILED });
      dispatch(setError(response.data.msg, response.status));
    });
};

// Edit an existing reminder

export const editReminder = (id, data) => (dispatch, getState) => {
  dispatch({ type: REQUEST_FETCH });
  return axios
    .patch('/api/reminders/' + id, data, tokenConfig(getState().auth.token))
    .then(res => {
      dispatch({ type: EDIT_REMINDER_SUCCESS, payload: res.data });
      dispatch(clearErrors());
      dispatch(getRemindersCount());
    })
    .catch(({ response }) => {
      dispatch({ type: EDIT_REMINDER_FAILED });
      dispatch(setError(response.data.msg, response.status));
    });
};
