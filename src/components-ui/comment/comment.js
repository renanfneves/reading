import React from 'react';
import PropTypes from 'prop-types';

import './comment.css';

const Comment = ({
  content,
  onVote,
  onRemoveVote,
  onEdit,
  votedComments,
  onDelete,
}) => (
  <div className="comment-container">
    <h3 className="comment-author">{content.author}</h3>
    <div className="comment-buttons">
      {
        votedComments.indexOf(content.id) === -1 ? (
          <i
            className="comment-score-button fa fa-star-o"
            onClick={() => onVote(content.id, content.parentId)}
          > 
            {' votar'}
          </i>
        ) : (
          <i
            className="comment-score-button fa fa-star"
            onClick={() => onRemoveVote(content.id, content.parentId)}
          >
            {' remover voto'}
          </i>
        )
      }
      
      <i
        className="comment-score-button fa fa-edit"
        onClick={() => onEdit(content)}
      >
        {' editar'}
      </i>
      <i
        className="comment-score-button fa fa-trash-o"
        onClick={() => onDelete(content)}
      >
        {' deletar'}
      </i>
    </div>
     
    <p className="comment-body">{content.body}</p>
    <p className="comment-score">
      {`${Math.abs(content.voteScore)} `} 
      <i className="fa fa-star"/>
    </p>
  </div>
);

Comment.propTypes = {
  onVote: PropTypes.func.isRequired,
  onRemoveVote: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  content: PropTypes.shape({
    id: PropTypes.string.isRequired,
    author: PropTypes.string,
    body: PropTypes.string,
    voteScore: PropTypes.number,
  }).isRequired,
  votedComments: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Comment;