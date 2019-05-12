import { LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from '../constants/actionTypes';

const initialState = {
  token: ''
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: payload.token
      };

    case LOGIN_FAILED:
      localStorage.clear();
      return {
        ...state,
        token: ''
      };

    default:
      return state;
  }
};
