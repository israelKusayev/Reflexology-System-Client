import React from 'react';
import { shallow } from 'enzyme';
import BootstrapTextarea from '../../../components/common/bootstrapTextarea';

let componentProps = {};
beforeEach(() => {
  componentProps = {
    label: 'Email',
    name: 'email',
    onChange: jest.fn(),
    value: 'value',
    required: false
  };
});
const setup = () => {
  const enzymeWrapper = shallow(<BootstrapTextarea {...componentProps} />);
  return { props: componentProps, enzymeWrapper };
};
describe('bootstrap input component', () => {
  it('should render the component', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.exists('div.form-group')).toBeTruthy();
    expect(enzymeWrapper.exists('label')).toBeTruthy();
    expect(enzymeWrapper.exists('textarea.form-control')).toBeTruthy();
  });

  it('should render the correct text', () => {
    const { enzymeWrapper, props } = setup();
    expect(enzymeWrapper.find('label').text()).toEqual(props.label);
    expect(enzymeWrapper.find('textarea').props().value).toEqual(props.value);
  });

  it('should trigger on change', () => {
    const { enzymeWrapper, props } = setup();
    enzymeWrapper.find('textarea').simulate('change');
    expect(props.onChange).toHaveBeenCalled();
  });

  it('should render * if input is required', () => {
    componentProps.required = true;
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('label').text()).toMatch('*');
  });
});
