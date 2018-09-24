import {
  COMMENT_SAVED,
  COMMENTS_OF_POST,
  VOTED_COMMENT,
  NOT_VOTED_COMMENT,
  COMMENT_TO_EDIT,
  REMOVE_COMMENT_TO_EDIT,
} from '../actions/comments';

const commentSaved = (state = {}, action) => {
  switch(action.type) {
    case COMMENT_SAVED:
    
        const { savedComment } = action;
  
        return savedComment;
  
    default :
      return state;
  }
};

const commentsOfPost = (state = [], action) => {
  switch(action.type) {
    case COMMENTS_OF_POST:
        const { comments } = action;
  
        return [ ...comments ];
  
    default :
      return state;
  }
};

const votedComments = (state = [], action) => {
  switch(action.type) {
    case VOTED_COMMENT:
      if (state.indexOf(action.commentId) === -1) {
        return [ ...state, action.commentId ];
      }

    case NOT_VOTED_COMMENT:
    if (state.indexOf(action.commentId) >= 0) {
      return [ ...state.filter(commentId => commentId !== action.commentId) ];
    }
  
    default :
      return state;
  }
};

const commentToEdit = (state = null, action) => {
  switch(action.type) {
    case COMMENT_TO_EDIT:
      return action.comment;

    case REMOVE_COMMENT_TO_EDIT:
      return null;

    default :
      return state;
  }
}

const commentsReducer = {
  commentSaved,
  commentsOfPost,
  votedComments,
  commentToEdit,
};

export default commentsReducer;