import React from 'react';
import { Login } from '../../components/login';
import { shallow } from 'enzyme';

const setup = () => {
  const props = {
    login: jest.fn(),
    error: '',
    location: '/'
  };

  const enzymeWrapper = shallow(<Login {...props} />);

  return {
    props,
    enzymeWrapper
  };
};

const simulateChange = (enzymeWrapper, name, value) => {
  enzymeWrapper
    .find('input#' + name)
    .simulate('change', { target: { value, name } });
};

describe('login component', () => {
  it('render the compnent', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('h1').hasClass('bold')).toBe(true);
    expect(enzymeWrapper.find('button[type="submit"]').text()).toBe('כניסה');
  });

  it('should handle changes', () => {
    const { enzymeWrapper } = setup();

    simulateChange(enzymeWrapper, 'username', 'israel');
    simulateChange(enzymeWrapper, 'password', '1234');

    expect(enzymeWrapper.state().username).toEqual('israel');
    expect(enzymeWrapper.state().password).toEqual('1234');
  });

  describe('handle submit', () => {
    it('should validate username', () => {
      const { enzymeWrapper } = setup();

      enzymeWrapper
        .find('form')
        .simulate('submit', { preventDefault: jest.fn() });

      expect(enzymeWrapper.state().error.length).not.toEqual(0);
    });

    const simulateSubmit = enzymeWrapper => {
      enzymeWrapper
        .find('form')
        .simulate('submit', { preventDefault: jest.fn() });
    };

    it('should validate password', () => {
      const { enzymeWrapper } = setup();
      simulateChange(enzymeWrapper, 'username', 'israel');

      simulateSubmit(enzymeWrapper);
      expect(enzymeWrapper.state().error.length).not.toEqual(0);
    });
    it('should call login function', () => {
      const { enzymeWrapper, props } = setup();

      simulateChange(enzymeWrapper, 'username', 'israel');
      simulateChange(enzymeWrapper, 'password', '1234');

      simulateSubmit(enzymeWrapper);

      expect(props.login).toBeCalled();
      expect(props.login.mock.calls.length).toBe(1);
      expect(props.login).toBeCalledWith(
        { username: 'israel', password: '1234' },
        ''
      );
    });
  });
});
