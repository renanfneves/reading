import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Post from './post';

const defaultProps = {
  post: {
    id: 'xsdc-sdds-sdsff',
    title: 'fake',
    body:	'fake',
    author:	'fake',
    category:	'react',
    voteScore: 2,
  },
  onVote: jest.fn(),
  onEdit: jest.fn(),
  votedPosts: [],
  onRemoveVote: jest.fn(),
  numberOfComments: 2,
  onDelete: jest.fn(),
  history: {},
};


it('renders default post', () => {
  const renderer = new ShallowRenderer();

  renderer.render(
    <Post
      {...defaultProps}
    />,
  );

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});

it('renders a voted post', () => {
  const renderer = new ShallowRenderer();

  defaultProps.votedPosts = ['xsdc-sdds-sdsff'];

  renderer.render(
    <Post
      {...defaultProps}
    />,
  );

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});