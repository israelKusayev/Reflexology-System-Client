import history from '../utils/history';
import { SYNC } from '../constants/actionTypes';

export const sync = () => {
  localStorage.clear();

  history.push('/patients');

  return {
    type: SYNC
  };
};
