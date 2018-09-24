import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import EmptyPosts from './empty-posts';


it('renders empty posts', () => {
  const renderer = new ShallowRenderer();

  renderer.render(
    <EmptyPosts
    />,
  );

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});