import React from 'react';
import { mount } from 'enzyme';
import BootstrapInput from '../../../components/common/bootstrapInput';

let componentProps = {};
beforeEach(() => {
  componentProps = {
    label: 'Email',
    name: 'email',
    onChange: jest.fn(),
    value: 'value',
    type: 'email',
    autoFocus: true,
    required: false
  };
});
const setup = () => {
  const enzymeWrapper = mount(<BootstrapInput {...componentProps} />);
  return { props: componentProps, enzymeWrapper };
};
describe('bootstrap input component', () => {
  it('should render the component', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.exists('div.form-group')).toBeTruthy();
    expect(enzymeWrapper.exists('FormLabel')).toBeTruthy();
    expect(enzymeWrapper.exists('input.form-control')).toBeTruthy();
  });

  it('should render the correct text', () => {
    const { enzymeWrapper, props } = setup();
    expect(enzymeWrapper.find('label').text()).toEqual(props.label);
    expect(enzymeWrapper.find('input').props().value).toEqual(props.value);
  });

  it('should trigger on change', () => {
    const { enzymeWrapper, props } = setup();
    enzymeWrapper.find('input').simulate('change');
    expect(props.onChange).toHaveBeenCalled();
  });

  it('should render * if input is required', () => {
    componentProps.required = true;
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('label').text()).toMatch('*');
  });
});
