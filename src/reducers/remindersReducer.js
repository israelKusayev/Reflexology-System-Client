import {
  GET_REMINDERS_SUCCESS,
  GET_REMINDERS_FAILED,
  EDIT_REMINDER_FAILED,
  EDIT_REMINDER_SUCCESS,
  GET_REMINDERS_COUNT_SUCCESS,
  GET_REMINDERS_COUNT_FAILED
} from '../constants/actionTypes';

const initialState = {
  data: [],
  newCount: 0
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_REMINDERS_SUCCESS:
      debugger;
      return { ...state, data: payload };

    case GET_REMINDERS_COUNT_SUCCESS:
      debugger;
      return { ...state, newCount: payload.count };

    case EDIT_REMINDER_SUCCESS:
    case EDIT_REMINDER_FAILED:
    case GET_REMINDERS_COUNT_FAILED:

    case GET_REMINDERS_FAILED:
    default:
      return state;
  }
};
