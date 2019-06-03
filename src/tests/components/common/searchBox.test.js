import React from 'react';
import { shallow } from 'enzyme';
import SearchBox from '../../../components/common/searchBox';

let componentProps = {};
beforeEach(() => {
  componentProps = {
    onChange: jest.fn(),
    value: 'value'
  };
});
const setup = () => {
  const enzymeWrapper = shallow(<SearchBox {...componentProps} />);
  return { props: componentProps, enzymeWrapper };
};
describe('bootstrap input component', () => {
  it('should render the component', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.exists('input.form-control')).toBeTruthy();
  });

  it('should render the correct text', () => {
    const { enzymeWrapper, props } = setup();
    expect(enzymeWrapper.find('input').props().value).toEqual(props.value);
  });

  it('should trigger on change', () => {
    const { enzymeWrapper, props } = setup();
    enzymeWrapper
      .find('input')
      .simulate('change', { target: { value: '123' } });
    expect(props.onChange).toHaveBeenCalledWith('123');
  });
});
