import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './post-preview.css';

const PostPreview = ({
  post,
  choseCategory,
  chosePost,
  onDelete,
  editPost,
  votedPosts,
  onRemoveVote,
  onVote,
}) => (
  <div className="post-preview-container">
    <div
      className={`${post.category}-category post-preview-image`}
      onClick={() => choseCategory(post.category)}
    />
    <div
      className="preview-content"
      onClick={() => chosePost(post)}
    >
      <h2>{post.title}</h2>
      <div>{`${post.body.substr(0, 50)}...`}</div>
      <p className="post-info">{post.author}</p>
      <p className="post-preview-date">
        {moment(post.timestamp).format('DD/MM/YYYY, HH:mm:SS')}
      </p>
      <p className="post-vote-score">
        {`${Math.abs(post.voteScore)} `}
        <i className="post-score-button fa fa-star"/>
        {
          votedPosts.indexOf(post.id) === -1 ? (
            <i
              className="post-score-button fa fa-star-o"
              onClick={event => onVote(event, post)}
            >
              {' votar'} 
            </i>
          ) : (
            <i
              className="post-score-button fa fa-star"
              onClick={event => onRemoveVote(event, post)}
            >
              {' remover voto'}
            </i> 
          )
        }
        <i 
          onClick={event => onDelete(event, post.id)}
          className="post-score-button fa fa-trash-o"
        >
          {' deletar'}
        </i>
        <i
          className="post-score-button fa fa-edit"
          onClick={event => editPost(event, post)}
        >
          { ' editar'}
        </i>
      </p>
    </div>
  </div>
);

PostPreview.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    body: PropTypes.string,
    category: PropTypes.string,
    voteScore: PropTypes.number,
    timestamp: PropTypes.number,
    deleted: PropTypes.bool,
  }).isRequired,
  choseCategory: PropTypes.func,
  chosePost: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
};

PostPreview.defaultProps = {
  choseCategory: () => {},
  votedPosts: []
}

export default PostPreview;
