import React from 'react';
import { mount } from 'enzyme';
import { Router } from 'react-router-dom';

import { ProtectedRoute } from '../../../components/common/protectedRoute';
import NotFound from '../../../components/notFound';

const setup = () => {
  const props = { component: NotFound, token: '123', path: '/r' };
  const enzymeWrapper = mount(
    <Router>
      <ProtectedRoute {...props} />
    </Router>
  );
  return { props, enzymeWrapper };
};
describe('table body component', () => {
  it('should render empty thead tr', () => {
    // const { enzymeWrapper, props } = setup();
    // console.log(enzymeWrapper.debug());
  });

  //   it('should render the component', () => {
  //     const { enzymeWrapper, props } = setup();
  //     expect(enzymeWrapper.exists('thead')).toBeTruthy();
  //     expect(enzymeWrapper.exists('tr')).toBeTruthy();
  //     expect(enzymeWrapper.exists('th')).toBeTruthy();
  //     expect(
  //       enzymeWrapper.contains(<th>{props.columns[0].label}</th>)
  //     ).toBeTruthy();
  //   });
});
