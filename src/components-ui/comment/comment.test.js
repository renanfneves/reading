import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Comment from './comment';

const defaultProps = {
  content: {
    id: 'jsddaj-asdaf-fafa',
    parentId: 'klfjksd-sdljjdsng-sdfsd',
    author: 'renan',
    body: 'post',
    voteScore: 2,
  },
  onVote: jest.fn(),
  onRemoveVote: jest.fn(),
  onEdit: jest.fn(),
  votedComments: ['jsddaj-asdaf-aaaa'],
  onDelete: jest.fn(),
}

it('renders comment not voted', () => {
  const renderer = new ShallowRenderer();

  renderer.render(
    <Comment
      {...defaultProps}
    />,
  );

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});

it('renders comment already voted', () => {
  const renderer = new ShallowRenderer();

  defaultProps.votedComments.push('jsddaj-asdaf-fafa');

  renderer.render(
    <Comment
      {...defaultProps}
    />,
  );

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
