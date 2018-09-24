import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import NewComment from './new-comment';

const defaultProps = {
  parentId: 'lnflknf-kjndskjf-knfdkln',
  onSubmit: jest.fn(),
  commentToEdit: null,
  updateComment: jest.fn(),
};


it('renders not filled new comment form', () => {
  const renderer = new ShallowRenderer();

  renderer.render(
    <NewComment
      {...defaultProps}
    />,
  );

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});

it('renders filled new comment form', () => {
  const renderer = new ShallowRenderer();

  defaultProps.commentToEdit = {
    id: 'alkjdsk-sdfdsf-sddsf',
    author: 'renan',
    body: 'comment',
  };

  renderer.render(
    <NewComment
      {...defaultProps}
    />,
  );

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});