import {
  GET_TREATMENTS_SUCCESS,
  GET_TREATMENTS_FAILED,
  ADD_TREATMENT_SUCCESS,
  ADD_TREATMENT_FAILED,
  REMOVE_TREATMENT,
  EDIT_TREATMENT_FAILED,
  EDIT_TREATMENT_SUCCESS,
  SYNC
} from '../constants/actionTypes';

export default (state = [], { type, payload }) => {
  switch (type) {
    case GET_TREATMENTS_SUCCESS:
      return payload;
    case ADD_TREATMENT_SUCCESS:
      return [payload, ...state];
    case EDIT_TREATMENT_SUCCESS:
      const index = state.findIndex(t => t._id === payload._id);
      state[index] = payload;
      return state;
    case REMOVE_TREATMENT:
    case SYNC:
      return [];
    case EDIT_TREATMENT_FAILED:
    case GET_TREATMENTS_FAILED:
    case ADD_TREATMENT_FAILED:
    default:
      return state;
  }
};
