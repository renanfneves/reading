import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import style from './post.css';

const Post = ({
    post,
    onVote,
    onEdit,
    votedPosts,
    onRemoveVote,
    numberOfComments,
    onDelete,
    history,
  }) => (
  <div className="post-container">
      <button
        onClick={() => history.push('/novo-post')}
        className="new-post-button"
      >
        <i className="fa fa-3x fa-plus-circle" />
      </button>
      <h2 className="post-info">{post.title}</h2>
      <p className="post-info">{post.author}</p>
      <p className="post-date">
        {moment(post.timestamp).format('DD/MM/YYYY, HH:mm:SS')}
      </p>
      <i
        className="post-score-button fa fa-edit"
        onClick={onEdit}
      >
        { ' editar'}
      </i>
      <i
        onClick={() => onDelete(post.id)}
        className="post-score-button fa fa-trash-o"
      >
        {' deletar'}
      </i>
      {
        votedPosts.indexOf(post.id) === -1 ? (
          <i
            className="post-score-button fa fa-star-o"
            onClick={() => onVote(post)}
          >
            {' votar'} 
          </i>
        ) : (
          <i
            className="post-score-button fa fa-star"
            onClick={() => onRemoveVote(post)}
          >
            {' remover voto'}
          </i> 
        )
      }
      <div className="post-score">
        {`${post.voteScore} `}
        <i className="post-score-button fa fa-star"/>
      </div>
    <p className="post-body">{post.body}</p>
    <p className="post-info">{`${numberOfComments} comnetários`}</p>
  </div>
);

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    body:	PropTypes.string,
    author:	PropTypes.string,
    category:	PropTypes.string,
    voteScore: PropTypes.number,
  }).isRequired,
  votedPosts: PropTypes.array,
  onRemoveVote: PropTypes.func.isRequired,
  numberOfComments: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default Post;
