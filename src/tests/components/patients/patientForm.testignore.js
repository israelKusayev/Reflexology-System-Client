import React from 'react';
import { shallow } from 'enzyme';
import PatientForm from '../../../components/patient/patientForm';

let componentProps = {};
beforeEach(() => {
  const data = {
    firstName: 'israel',
    lastName: '1234',
    momName: '',
    age: '',
    phone: '',
    email: ''
  };
  componentProps = {
    onChange: jest.fn(),
    onSubmit: jest.fn(),
    error: '',
    data
  };
});
const setup = () => {
  const enzymeWrapper = shallow(<PatientForm {...componentProps} />);
  return { props: componentProps, enzymeWrapper };
};
describe('bootstrap input component', () => {
  it('should render the component', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.exists('form')).toBeTruthy();
    expect(enzymeWrapper.exists('button[type="submit"]')).toBeTruthy();
    expect(enzymeWrapper.exists('BootstrapInput')).toBeTruthy();
  });

  it('should render the correct text', () => {
    const { enzymeWrapper, props } = setup();
    expect(
      enzymeWrapper
        .find('BootstrapInput')
        .at(0)
        .props().value
    ).toEqual(props.data.lastName);
  });

  it('should trigger on change', () => {
    const { enzymeWrapper, props } = setup();
    enzymeWrapper
      .find('BootstrapInput')
      .at(0)
      .simulate('change');
    expect(props.onChange).toHaveBeenCalled();
  });

  it('should render error if error exists', () => {
    componentProps.error = '1234';
    const { enzymeWrapper, props } = setup();

    expect(enzymeWrapper.find('div.alert.alert-danger').text()).toEqual(props.error);
  });
});
