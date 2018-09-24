import React from 'react';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';

import './new-comment.css';

class NewComment extends React.Component {
  state = {
    author: '',
    body: '',
  }

  saveComment(saveFunction, comment) {
    saveFunction(comment)
      .then(() => this.setState({
        author: '',
        body: '',
      }));
  }

  handlerSubmit() {
    const { 
      onSubmit,
      parentId,
      commentToEdit,
      updateComment
    } = this.props;

    const comment = { ...this.state, parentId };
    if (!comment.author || !comment.body) { return; }

    if (commentToEdit) {
      const editingComment = {
        ...comment,
        id: commentToEdit.id,
      }

      this.saveComment(updateComment, editingComment);
    }
    else {
      const newComment = {
        ...comment,
        id: uuidv1(),
      }

      this.saveComment(onSubmit, newComment);
    }
  } 

  handlerRemoveCommentToEdit() {
    this.setState({
      author: '',
      body: '',
    }, () => this.props.removeCommentToEdit());
  }

  componentWillReceiveProps(nexProps) {
    const { commentToEdit } = nexProps;
    
    if (commentToEdit && commentToEdit.id) {
      this.setState({
        ...commentToEdit
      })
    }
  }

  render() {

    return (
      <form className="new-comment-container" id="comment-form">
        <label className="new-comment-label">autor</label>
        <input
          value={this.state.author}
          onChange={event => this.setState({ author: event.target.value })}
          className="new-comment-author"
          disabled={this.props.commentToEdit !== null}
        />
        <label  className="new-comment-label">comentário</label>
        <textarea
          value={this.state.body}
          onChange={event => this.setState({ body: event.target.value })}
          className="new-comment-body"
        />
        {
          this.props.commentToEdit  && <button
            type="button"
            className="remove-comment-edit"
            onClick={() => this.handlerRemoveCommentToEdit()}
          >
            cancelar edição
          </button>
        }
        <button
          type="button"
          onClick={() => this.handlerSubmit()}
        >
          <i className="fa fa-3x fa-share-square"></i>
        </button> 
      </form>
    )
  }
};

NewComment.propTypes = {
  parentId: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  commentToEdit: PropTypes.object,
  updateComment: PropTypes.func.isRequired,
  removeCommentToEdit: PropTypes.func.isRequired,
};

NewComment.defaultProps = {
  commentToEdit: {},
};

export default NewComment;