import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import PostPreview from './post-preview';

const defaultProps = {
  post: {
    id: 'sdfdff-sdfds-dfsfds',
    title: 'fake',
    author: 'fake',
    body: 'fake',
    category: 'react',
    voteScore: 3,
    timestamp: 1467166872634,
    deleted: false,
  },
  choseCategory: jest.fn(),
  chosePost: jest.jn(),
  onDelete: jest.fn()
};


it('renders default post preview', () => {
  const renderer = new ShallowRenderer();

  renderer.render(
    <PostPreview
      {...defaultProps}
    />,
  );

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});