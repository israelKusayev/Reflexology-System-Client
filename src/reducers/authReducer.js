import { LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from '../constants/actionTypes';
import { TOKEN_KEY } from '../constants/localStorageConstants';

const initialState = {
  token: localStorage.getItem(TOKEN_KEY) || null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem(TOKEN_KEY, payload.token);
      return {
        ...state,
        token: localStorage.getItem(TOKEN_KEY)
      };

    case LOGIN_FAILED:
      localStorage.clear();
      return {
        ...state,
        token: null
      };

    case LOGOUT:
    default:
      return state;
  }
};
