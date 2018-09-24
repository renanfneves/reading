import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import NewPostForm from './new-post-form';

const defaultProps = {
  categories: [{ name: 'react' }, { name: 'redux' }],
  onSubmit: jest.fn(),
  onEdit: jest.fn(),
  isUpdating: false,
  history: {},
  postToEdit:  null,
};


it('renders not filled new post form', () => {
  const renderer = new ShallowRenderer();

  renderer.render(
    <NewPostForm
      {...defaultProps}
    />,
  );

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});

it('renders filled new post form', () => {
  const renderer = new ShallowRenderer();

  defaultProps.isUpdating = true;
  defaultProps.postToEdit = {
    id: 'sdfdsfsf-sgrg-dhhh',
    title: 'fake',
    body: 'fake',
    author: 'fake',
    category: 'react',
  }

  renderer.render(
    <NewPostForm
      {...defaultProps}
    />,
  );

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});