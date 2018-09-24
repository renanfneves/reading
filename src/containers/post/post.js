import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getCommentsOfPost,
  addComment,
  voteOnComment,
  removeVoteOnComment,
  updateComment,
  addCommentToEdit,
  deleteComment,
  removeCommentToEdit,
} from '../../actions/comments';

import {
  getPost,
  voteOnPost,
  removeVoteOnPost,
  addPostToEdit,
  deletePost,
} from '../../actions/posts';

import PostDetail from '../../components-ui/post';
import EmptyPosts from '../../components-ui/empty-posts';
import NewComment from '../../components-ui/new-comment';
import Comment from '../../components-ui/comment';

const getPostIdFromQueryString = () => {
  const pathName = window.location.pathname;
  const params = pathName.split('/').filter(x => x !== '');

  return params[(params.length-1)];
}

class Post extends React.Component {
  static fetchData(params, dispatch) {
    const postId = getPostIdFromQueryString();

    return Promise.all([
      dispatch(getPost(postId)),
      dispatch(getCommentsOfPost(postId)),
    ]);
  }

  handlerPostVote(post) {
    this.props.voteOnPost(post).then(() => this.forceUpdate());
  }

  handlerPostRemoveVote(post) {
    this.props.removeVoteOnPost(post).then(() => this.forceUpdate());
  }

  handlerAddCommentToEdit(comment) {
    this.props.addCommentToEdit(comment);
    
    document.getElementById('comment-form').scrollIntoView();
  }

  handlerPostEdit() {
    const { addPostToEdit, history, chosenPost } = this.props;

    addPostToEdit(chosenPost);
    history.push(`/editar-post/${chosenPost.id}`);
  }

  handlerPostDeleting(postId) {
    const { deletePost, history } = this.props;

    deletePost(postId);
    history.push('/');
  } 

  handlerRemoveCommentToEdit() {
    this.props.removeCommentToEdit();
    this.forceUpdate();
  }
  

  componentDidMount() {
    Post.fetchData(this.props, this.props.dispatch);
    window.scrollTo(0, 0);
  }

  render() {
    const { 
      chosenPost,
      commentsOfPost,
      addComment,
      voteOnComment,
      removeVoteOnComment,
      votedComments,
      voteOnPost,
      votedPosts,
      updateComment,
      commentToEdit,
      addCommentToEdit,
      deleteComment,
      history,
    } = this.props;

    return (
      chosenPost && chosenPost.id ? (
        <Fragment>
          <PostDetail
            post={chosenPost} 
            onVote={post => this.handlerPostVote(post)}
            onRemoveVote={post => this.handlerPostRemoveVote(post)}
            votedPosts={votedPosts}
            onEdit={post => this.handlerPostEdit(post)}
            numberOfComments={commentsOfPost.length}
            onDelete={postId => this.handlerPostDeleting(postId)}
            history={history}
          />
          <NewComment 
            parentId={chosenPost.id}
            onSubmit={addComment}
            commentToEdit={commentToEdit}
            updateComment={updateComment}
            removeCommentToEdit={() => this.handlerRemoveCommentToEdit()}
          />
          {
            commentsOfPost
              .filter(comment => !comment.deleted)
              .sort((comment1, comment2) => 
                comment1.voteScore < comment2.voteScore)
              .map(comment =>
                <Comment 
                  key={comment.id}
                  content={comment}
                  onVote={voteOnComment}
                  onRemoveVote={removeVoteOnComment}
                  onEdit={comment => this.handlerAddCommentToEdit(comment)}
                  votedComments={votedComments}
                  onDelete={deleteComment}
                />
              )
          }
        </Fragment>
      ) : ( 
        <EmptyPosts />
      )
    );
  }
}

const mapStateToProps = state => ({
  chosenPostId: state.chosenPostId,
  chosenPost: state.chosenPost,
  commentsOfPost: state.commentsOfPost,
  votedComments: state.votedComments,
  votedPosts: state.votedPosts,
  commentToEdit: state.commentToEdit,
});

const mapDispatchToProps = dispatch => ({
  getPost: post => dispatch(getPost(post)),
  voteOnComment: (commentId, postId) => 
    dispatch(voteOnComment(commentId, postId)),
  removeVoteOnComment: (commentId, postId) => 
    dispatch(removeVoteOnComment(commentId, postId)),
  addComment: comment => dispatch(addComment(comment)),
  getCommentsOfPost: postId => dispatch(getCommentsOfPost(postId)),
  voteOnPost: post => dispatch(voteOnPost(post)),
  removeVoteOnPost: post => dispatch(removeVoteOnPost(post)),
  addPostToEdit: post => dispatch(addPostToEdit(post)),
  addCommentToEdit: comment => dispatch(addCommentToEdit(comment)),
  updateComment: comment => dispatch(updateComment(comment)),
  deletePost: postId => dispatch(deletePost(postId)),
  deleteComment: comment => dispatch(deleteComment(comment)),
  removeCommentToEdit: () => dispatch(removeCommentToEdit()),
  dispatch,
});

Post.propTypes = {
  commentsOfPost: PropTypes.array,
  chosenPost: PropTypes.object.isRequired,
  votedComments: PropTypes.array.isRequired,
  votedPosts: PropTypes.array.isRequired,
  commentToEdit: PropTypes.object,
};

Post.defaultProps = {
  commentsOfPost: [],
  commentToEdit: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
