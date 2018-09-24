import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import NotFound from './not-found';

test('It default not found', () => {
  const renderer = new ShallowRenderer();
  renderer.render(
    <NotFound />
  );
  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});