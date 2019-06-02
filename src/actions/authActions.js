import axios from 'axios';
import {
  REQUEST_FETCH,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT
} from '../constants/actionTypes';
import { setError, clearErrors } from './errorActions';
import history from '../utils/history';

// Login user
export const login = (user, returnUrl) => dispatch => {
  dispatch({ type: REQUEST_FETCH });

  return axios
    .post('/api/auth', JSON.stringify(user))
    .then(res => {
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      dispatch(clearErrors());
      history.push(returnUrl ? returnUrl : '/patients');
    })
    .catch(({ response }) => {
      dispatch({ type: LOGIN_FAILED });
      dispatch(setError(response.data.msg, response.status));
    });
};

// Logout user
export const logout = () => {
  history.push('/login');
  return { type: LOGOUT };
};

// Set custom token header
export function tokenConfig(token) {
  if (token) {
    return { headers: { 'x-auth-token': token } };
  }
}
