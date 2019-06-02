import * as authActions from '../../actions/authActions';
import * as errorActions from '../../actions/errorActions';
import * as patientActions from '../../actions/patientActions';
import * as treatmentActions from '../../actions/treatmentActions';

import * as types from '../../constants/actionTypes';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store;
let payload;
let status;
beforeEach(() => {
  moxios.install();
  store = mockStore({ auth: { token: '1234' } });
  status = 200;
});

afterEach(() => {
  moxios.uninstall();
});

const mockRequest = () => {
  moxios.wait(() => {
    const request = moxios.requests.mostRecent();
    request.respondWith({
      status,
      response: payload
    });
  });
};

describe('auth actions', () => {
  describe('action creators', () => {
    it('should create an action to logout', () => {
      const expectedAction = {
        type: types.LOGOUT
      };
      expect(authActions.logout()).toEqual(expectedAction);
    });

    it('should return object with header', () => {
      const token = 'abcd';
      expect(authActions.tokenConfig(token)).toEqual(
        expect.objectContaining({
          headers: {
            'x-auth-token': token
          }
        })
      );
    });
  });

  describe('async action creators', () => {
    it('creates LOGIN_SUCCESS when login has been done', async () => {
      payload = { token: 'someToken' };
      mockRequest();

      const expectedActions = [
        { type: types.REQUEST_FETCH },
        {
          type: types.LOGIN_SUCCESS,
          payload
        },
        { type: types.CLEAR_ERRORS }
      ];

      return store.dispatch(authActions.login({}, '/')).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  it('creates LOGIN_FAILED when login failed', async () => {
    status = 400;
    payload = { msg: 'error' };
    mockRequest();

    const expectedActions = [
      { type: types.REQUEST_FETCH },
      {
        type: types.LOGIN_FAILED
      },
      {
        type: types.SET_ERRORS,
        payload: { id: null, msg: payload.msg, status }
      }
    ];

    return store.dispatch(authActions.login({}, '/')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('error actions', () => {
  describe('action creators', () => {
    it('create an action to set error', () => {
      const msg = 'error';
      const status = 500;
      const expectedAction = {
        type: types.SET_ERRORS,
        payload: { msg, status, id: null }
      };

      expect(errorActions.setError(msg, status)).toEqual(expectedAction);
    });
    it('create an action to clear errors', () => {
      const expectedAction = {
        type: types.CLEAR_ERRORS
      };

      expect(errorActions.clearErrors()).toEqual(expectedAction);
    });
  });
});

describe('patinet actions', () => {
  describe('action creators', () => {
    it('create an action to set current patinet', () => {
      const currentPatient = { _id: '123' };
      const expectedAction = {
        type: types.SET_CURRENT_PATINET,
        payload: { currentPatient }
      };

      expect(patientActions.setCurrentPatient(currentPatient)).toEqual(
        expectedAction
      );
    });
  });

  describe('async action creators', () => {
    it('creates ADD_PATIENT_SUCCESS when add patinet has been done', () => {
      payload = { patient: { _id: '1234' } };
      mockRequest();

      const expectedActions = [
        { type: types.REQUEST_FETCH },
        {
          type: types.ADD_PATIENT_SUCCESS,
          payload
        },
        { type: types.CLEAR_ERRORS }
      ];

      return store.dispatch(patientActions.addPatient({})).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('creates EDIT_PATIENT_SUCCESS when edit patinet has been done', () => {
      payload = { patient: { _id: '1234' } };
      mockRequest();

      const expectedActions = [
        { type: types.REQUEST_FETCH },
        {
          type: types.EDIT_PATIENT_SUCCESS,
          payload
        },
        { type: types.CLEAR_ERRORS }
      ];

      return store.dispatch(patientActions.editPatient({})).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('creates GET_PATIENTS_SUCCESS when get patinets has been done', () => {
      payload = [{ patient: { _id: '1234' } }];
      mockRequest();

      const expectedActions = [
        { type: types.REQUEST_FETCH },
        {
          type: types.GET_PATIENTS_SUCCESS,
          payload
        }
      ];

      return store.dispatch(patientActions.getPatients()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});

describe('treatment actions', () => {
  describe('action creators', () => {
    it('create an action to remove treatments', () => {
      const expectedAction = {
        type: types.REMOVE_TREATMENT
      };

      expect(treatmentActions.removeTreatmnets()).toEqual(expectedAction);
    });
  });

  describe('async action creators', () => {
    it('creates ADD_TREATMENT_SUCCESS when add treatment has been done', () => {
      payload = { treatment: { _id: '1234' } };
      mockRequest();

      const expectedActions = [
        { type: types.REQUEST_FETCH },
        {
          type: types.ADD_TREATMENT_SUCCESS,
          payload
        },
        { type: types.CLEAR_ERRORS }
      ];

      return store.dispatch(treatmentActions.addTreatment(payload)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('creates EDIT_TREATMENT_SUCCESS when edit treatment has been done', () => {
      payload = { treatment: { _id: '1234' } };
      mockRequest();

      const expectedActions = [
        { type: types.REQUEST_FETCH },
        {
          type: types.EDIT_TREATMENT_SUCCESS,
          payload
        },
        { type: types.CLEAR_ERRORS }
      ];

      return store
        .dispatch(treatmentActions.editTreatment(payload))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
    it('creates GET_TREATMENTS_SUCCESS when add treatment has been done', () => {
      payload = { treatment: { _id: '1234' } };
      mockRequest();

      const expectedActions = [
        { type: types.REQUEST_FETCH },
        {
          type: types.GET_TREATMENTS_SUCCESS,
          payload
        }
      ];

      return store.dispatch(treatmentActions.getTreatments(1)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
