import {
  GET_PATIENT_SUCCESS,
  GET_PATIENT_FAILED,
  ADD_PATIENT_SUCCESS,
  ADD_PATIENT_FAILED,
  EDIT_PATIENT_SUCCESS,
  EDIT_PATIENT_FAILED,
  SYNC
} from '../constants/actionTypes';

export default (state = [], { type, payload }) => {
  switch (type) {
    case GET_PATIENT_SUCCESS:
      return payload;
    case ADD_PATIENT_SUCCESS:
      return [payload, ...state];
    case EDIT_PATIENT_SUCCESS:
      const index = state.findIndex(p => p._id === payload._id);
      state[index] = payload;
      return state;
    case SYNC:
      return [];
    case GET_PATIENT_FAILED:
    case ADD_PATIENT_FAILED:
    case EDIT_PATIENT_FAILED:
    default:
      return state;
  }
};
