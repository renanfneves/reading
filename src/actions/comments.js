import axios from'axios';

import * as CommentAPI from '../utils/commentAPI';

export const COMMENT_SAVED = 'COMMENT_SAVED';
export const COMMENTS_OF_POST = 'COMMENTS_OF_POST';
export const VOTED_COMMENT = 'VOTED_COMMENT';
export const NOT_VOTED_COMMENT = 'NOT_VOTED_COMMENT';
export const COMMENT_TO_EDIT = 'COMMENT_TO_EDIT';
export const REMOVE_COMMENT_TO_EDIT = 'REMOVE_COMMENT_TO_EDIT';

export const commentSaved = savedComment => ({
  type: COMMENT_SAVED,
  savedComment,
});

export const commentsOfPost = comments => ({
  type: COMMENTS_OF_POST,
  comments,
});

export const votedComment = commentId => ({
  type: VOTED_COMMENT,
  commentId,
})

export const notVotedComment = commentId => ({
  type: NOT_VOTED_COMMENT,
  commentId,
});

export const addCommentToEdit = comment => ({
  type: COMMENT_TO_EDIT,
  comment
});

export const removeCommentToEdit = () => ({
  type: REMOVE_COMMENT_TO_EDIT,
});

export const addComment = comment => dispatch => (
  CommentAPI
    .addComment(comment)
      .then(savedComment => dispatch(commentSaved(savedComment)))
        .then(() => dispatch(getCommentsOfPost(comment.parentId)))
);

export const deleteComment = comment => dispatch => (
  CommentAPI
    .deleteComment(comment.id)
        .then(() => dispatch(getCommentsOfPost(comment.parentId)))
);

export const updateComment = comment => dispatch => (
  CommentAPI
    .updateComment(comment)
      .then(() => dispatch(removeCommentToEdit(comment)))
        .then(() => dispatch(getCommentsOfPost(comment.parentId)))
);

export const getCommentsOfPost = postId => dispatch => (
  CommentAPI
    .getCommentsOfPost(postId)
      .then(comments => dispatch(commentsOfPost(comments)))
);

export const voteOnComment = (commentId, postId) => dispatch => (
  CommentAPI
    .updateCommentVote(commentId, 'upVote')
      .then(() => dispatch(votedComment(commentId)))
        .then(response => dispatch(getCommentsOfPost(postId)))
);

export const removeVoteOnComment = (commentId, postId) => dispatch => (
  CommentAPI
    .updateCommentVote(commentId, 'downVote')
      .then(() => dispatch(votedComment(commentId)))
        .then(response => dispatch(getCommentsOfPost(postId)))
);

