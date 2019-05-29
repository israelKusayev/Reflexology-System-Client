import {
  GET_PATIENTS_SUCCESS,
  GET_PATIENTS_FAILED,
  ADD_PATIENT_SUCCESS,
  ADD_PATIENT_FAILED,
  EDIT_PATIENT_SUCCESS,
  EDIT_PATIENT_FAILED,
  SYNC,
  SET_CURRENT_PATINET
} from '../constants/actionTypes';

const initialState = {
  patients: [],
  currentPatient: ''
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PATIENTS_SUCCESS:
      return { ...state, patients: payload };
    case ADD_PATIENT_SUCCESS:
      return { ...state, patients: [payload, ...state.patients] };

    case EDIT_PATIENT_SUCCESS:
      const index = state.patients.findIndex(p => p._id === payload._id);
      state.patients[index] = payload;
      return state;
    case SET_CURRENT_PATINET:
      return { ...state, ...payload };
    case SYNC:
      return initialState;

    case GET_PATIENTS_FAILED:
    case ADD_PATIENT_FAILED:
    case EDIT_PATIENT_FAILED:
    default:
      return state;
  }
};
