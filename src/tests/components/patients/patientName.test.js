import React from 'react';
import renderer from 'react-test-renderer';
import PatientName from '../../../components/patient/patientName';
describe('patient name component', () => {
  it('should ', () => {
    const component = renderer.create(
      <patientName
        patient={{ firstName: 'test', lastName: '1234', momName: 'mom' }}
      />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
