import React from 'react';
import Loading from '../../components/loading';
import renderer from 'react-test-renderer';
import Root from '../../root';

test('renders correctly', () => {
  const component = renderer.create(
    <Root initialState={{ loading: true }}>
      <Loading />
    </Root>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
