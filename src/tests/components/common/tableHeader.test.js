import React from 'react';
import { shallow } from 'enzyme';
import TableHeader from '../../../components/common/tableHeader';

const setup = () => {
  const columns = [
    { label: 'שם משפחה', path: 'lastName' },
    {
      label: 'שם פרטי',
      path: 'firstName',
      content: item => <span>{item['firstName']}</span>
    }
  ];

  const props = { columns };
  const enzymeWrapper = shallow(<TableHeader {...props} />);
  return { props, enzymeWrapper };
};
describe('table body component', () => {
  it('should render empty thead tr', () => {
    const enzymeWrapper = shallow(<TableHeader data={[]} columns={[]} />);
    expect(
      enzymeWrapper.contains(
        <thead>
          <tr />
        </thead>
      )
    ).toBeTruthy();
  });

  it('should render the component', () => {
    const { enzymeWrapper, props } = setup();
    expect(enzymeWrapper.exists('thead')).toBeTruthy();
    expect(enzymeWrapper.exists('tr')).toBeTruthy();
    expect(enzymeWrapper.exists('th')).toBeTruthy();
    expect(
      enzymeWrapper.contains(<th>{props.columns[0].label}</th>)
    ).toBeTruthy();
  });
});
