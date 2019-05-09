import history from '../utils/history';
import { SYNC } from '../constants/actionTypes';

export const sync = () => {
  history.push('/patients');
  return {
    type: SYNC
  };
};
