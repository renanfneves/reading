import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Categories from './categories';

it('renders categories', () => {
  const renderer = new ShallowRenderer();

  const categs = [
    { name: 'react' },
    { name: 'redux' }
  ];

  renderer.render(
    <Categories
      categories={categs}
      choseCategory={jest.fn()}
    />,
  );

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
