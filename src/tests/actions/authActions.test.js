import * as actions from '../../actions/authActions';
import * as types from '../../constants/actionTypes';

describe('actions', () => {
  it('should create an action to logout', () => {
    const text = 'Finish docs';
    const expectedAction = {
      type: types.LOGOUT
    };
    expect(actions.logout(text)).toEqual(expectedAction);
  });

  it('should return object with header', () => {
    const token = 'abcd';
    expect(actions.tokenConfig(token)).toEqual(
      expect.objectContaining({
        headers: {
          'x-auth-token': token
        }
      })
    );
  });
});
