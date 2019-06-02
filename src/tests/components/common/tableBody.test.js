import React from 'react';
import { shallow } from 'enzyme';
import TableBody from '../../../components/common/tableBody';

const setup = () => {
  const columns = [
    { label: 'שם משפחה', path: 'lastName' },
    { label: 'שם פרטי', path: 'firstName' }
  ];

  const data = [
    { lastName: '123', firstName: 'a' },
    { lastName: '456', firstName: 'b' }
  ];
  const props = { onRowClick: jest.fn(), data, columns };
  const enzymeWrapper = shallow(<TableBody {...props} />);
  return { props, enzymeWrapper };
};
describe('table body component', () => {
  it('should render the component', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.exists('tbody')).toBeTruthy();
    expect(enzymeWrapper.exists('tr')).toBeTruthy();
    expect(enzymeWrapper.exists('td')).toBeTruthy();
  });
});
