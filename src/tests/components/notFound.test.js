import React from 'react';
import renderer from 'react-test-renderer';
import NotFound from '../../components/notFound';

describe('not found component', () => {
  it('renders correctly', () => {
    const component = renderer.create(<NotFound />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
