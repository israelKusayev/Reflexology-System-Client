import React from 'react';
import { shallow } from 'enzyme';
import TableBody from '../../../components/common/tableBody';

const setup = () => {
  const columns = [
    { label: 'שם משפחה', path: 'lastName' },
    {
      label: 'שם פרטי',
      path: 'firstName',
      content: item => <span>{item['firstName']}</span>
    }
  ];

  const data = [
    { _id: 1, lastName: '123', firstName: 'a' },
    { _id: 2, lastName: '456', firstName: 'b' },
    { _id: 3, lastName: '678', firstName: 'c' }
  ];
  const props = { onRowClick: jest.fn(), data, columns };
  const enzymeWrapper = shallow(<TableBody {...props} />);
  return { props, enzymeWrapper };
};
describe('table body component', () => {
  it('should render empty tbody', () => {
    const enzymeWrapper = shallow(<TableBody data={[]} columns={[]} />);
    expect(enzymeWrapper.contains(<tbody />)).toBeTruthy();
  });

  it('should render the component', () => {
    const { enzymeWrapper, props } = setup();
    expect(enzymeWrapper.exists('tbody')).toBeTruthy();
    expect(enzymeWrapper.exists('tr')).toBeTruthy();
    expect(enzymeWrapper.exists('td')).toBeTruthy();
    expect(
      enzymeWrapper.contains(
        <td className='align-middle'>{props.data[0].lastName}</td>
      )
    ).toBeTruthy();
  });

  it('should render the content', () => {
    const { enzymeWrapper, props } = setup();

    expect(
      enzymeWrapper.contains(
        <td className='align-middle'>
          <span>{props.data[0].firstName}</span>
        </td>
      )
    ).toBeTruthy();
  });
});
