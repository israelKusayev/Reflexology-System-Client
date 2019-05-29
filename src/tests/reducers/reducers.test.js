import authReducer from '../../reducers/authReducer';
import errorReducer from '../../reducers/errorReducer';
import loadingReducer from '../../reducers/loadingReducer';
import patientsReducer from '../../reducers/patientsReducer';
import rootReducer from '../../reducers/rootReducer';
import treatmentsReducer from '../../reducers/treatmentsReducer';

import * as types from '../../constants/actionTypes';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual({
      token: ''
    });
  });

  it('should handle LOGIN_SUCCESS', () => {
    expect(
      authReducer(
        {},
        {
          type: types.LOGIN_SUCCESS,
          payload: { token: 'token' }
        }
      )
    ).toEqual({ token: 'token' });
  });

  it('should handle LOGIN_FAILED', () => {
    expect(
      authReducer({ token: '1234' }, { type: types.LOGIN_FAILED })
    ).toEqual({ token: '' });
  });

  it('should clear the local storage if LOGIN_FAILED', () => {
    const key = 'token';
    localStorage.setItem(key, '123');
    authReducer(undefined, { type: types.LOGIN_FAILED });
    expect(localStorage.getItem(key)).toBeNull();
  });
});

describe('error reducer', () => {
  it('should return the initial state', () => {
    expect(errorReducer(undefined, {})).toEqual({
      msg: '',
      status: null,
      id: null
    });
  });

  it('should handle SET_ERRORS', () => {
    const payload = { msg: 'msg', status: 404, id: 12 };
    expect(errorReducer({}, { type: types.SET_ERRORS, payload })).toEqual(
      payload
    );
  });

  it('should handle CLEAR_ERRORS', () => {
    expect(
      errorReducer({ msg: 'msg', status: 404 }, { type: types.CLEAR_ERRORS })
    ).toEqual({ msg: '', status: null, id: null });
  });
});

describe('loading reducer', () => {
  it('should return false if action type is not a request', () => {
    expect(loadingReducer(undefined, { type: types.SYNC })).toEqual(false);
  });

  it('should return false if action type is a request success or faild', () => {
    expect(loadingReducer(undefined, { type: types.LOGIN_SUCCESS })).toEqual(
      false
    );
    expect(loadingReducer(undefined, { type: types.LOGIN_FAILED })).toEqual(
      false
    );
  });

  it('should return true if action type a fetch request', () => {
    expect(loadingReducer(undefined, { type: types.REQUEST_FETCH })).toEqual(
      true
    );
  });
});

describe('patinets reducer', () => {
  it('should return the initial state', () => {
    expect(patientsReducer(undefined, {})).toEqual({
      patients: [],
      currentPatient: ''
    });
  });

  it('should handle GET_PATIENTS_SUCCESS', () => {
    const payload = [{ name: 'test' }, { name: 'test1' }];
    expect(
      patientsReducer(undefined, { type: types.GET_PATIENTS_SUCCESS, payload })
    ).toEqual({
      patients: payload,
      currentPatient: ''
    });
  });

  it('should handle ADD_PATIENTS_SUCCESS', () => {
    const initialState = { currentPatient: '', patients: [{ name: 'test' }] };
    const payload = { name: 'test1' };
    expect(
      patientsReducer(initialState, {
        type: types.ADD_PATIENT_SUCCESS,
        payload
      })
    ).toEqual({
      patients: [payload, ...initialState.patients],
      currentPatient: ''
    });
  });

  it('should handle EDIT_PATIENT_SUCCESS', () => {
    const initialState = {
      currentPatient: '',
      patients: [{ _id: '1', name: 'test' }, { _id: '2', name: 'test1' }]
    };
    const payload = { _id: '1', name: 'test11' };
    expect(
      patientsReducer(initialState, {
        type: types.EDIT_PATIENT_SUCCESS,
        payload
      })
    ).toEqual({
      patients: [payload, initialState.patients[1]],
      currentPatient: ''
    });
  });

  it('should handle SET_CURRENT_PATINET', () => {
    const initialState = {
      currentPatient: '',
      patients: [{ _id: '1', name: 'test' }]
    };
    const payload = { currentPatient: initialState.patients[0] };
    expect(
      patientsReducer(initialState, {
        type: types.SET_CURRENT_PATINET,
        payload
      })
    ).toEqual({
      ...initialState,
      ...payload
    });
  });

  it('should handle SYNC', () => {
    const initialState = {
      currentPatient: '',
      patients: []
    };
    expect(patientsReducer(initialState, { type: types.SYNC })).toEqual(
      initialState
    );
  });
});

describe('root reducer', () => {
  it('should return the a valid store', () => {
    expect(rootReducer(undefined, {})).toEqual(
      expect.objectContaining({
        auth: expect.any(Object),
        patients: expect.any(Object),
        treatments: expect.any(Array),
        error: expect.any(Object),
        loading: expect.any(Boolean)
      })
    );
  });

  it('should handle LOGOUT', () => {
    const key = 'state';
    localStorage.setItem(key, 'someState');
    rootReducer(undefined, { type: types.LOGOUT });
    expect(localStorage.getItem(key)).toBeNull();
  });
});

describe('treatments reducer', () => {
  it('should return the initial state', () => {
    expect(treatmentsReducer(undefined, {})).toEqual([]);
  });

  it('should handle GET_TREATMENTS_SUCCESS', () => {
    const payload = [{ id: '123' }, { id: '1234' }];
    expect(
      treatmentsReducer(undefined, {
        type: types.GET_TREATMENTS_SUCCESS,
        payload
      })
    ).toEqual(payload);
  });

  it('should handle ADD_TREATMENT_SUCCESS', () => {
    const initialState = [{ id: '1234' }];
    const payload = { id: '123' };
    expect(
      treatmentsReducer(initialState, {
        type: types.ADD_TREATMENT_SUCCESS,
        payload
      })
    ).toEqual([payload, ...initialState]);
  });

  it('should handle EDIT_TREATMENT_SUCCESS', () => {
    const initialState = [
      { id: '1', visitReason: 'abc' },
      { id: '2', visitReason: '12' }
    ];
    const payload = { id: '1', visitReason: '12112' };
    expect(
      treatmentsReducer(initialState, {
        type: types.EDIT_TREATMENT_SUCCESS,
        payload
      })
    ).toEqual([payload, initialState[1]]);
  });

  it('should handle REMOVE_TREATMENT and SYNC', () => {
    const initialState = [{ id: '1', visitReason: 'abc' }];
    expect(
      treatmentsReducer(initialState, { type: types.REMOVE_TREATMENT })
    ).toEqual([]);

    expect(treatmentsReducer(initialState, { type: types.SYNC })).toEqual([]);
  });
});
