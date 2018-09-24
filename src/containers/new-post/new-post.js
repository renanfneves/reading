import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCategories } from '../../actions/categories';
import { addPost, editPost } from '../../actions/posts';

import NewPostForm from '../../components-ui/new-post-form';

class NewPost extends React.Component {
  static fetchData(dispatch) {
    return dispatch(getCategories());
  }
  state = {
    isUpdating: false,
  }

  componentDidMount() {
    NewPost.fetchData(this.props.dispatch);
  }

  render() {
    const {
      addPost,
      categories,
      history,
      postToEdit,
      editPost
    } = this.props;

    return (
      <NewPostForm
        onSubmit={addPost}
        onEdit={editPost}
        isUpdating={this.state.isUpdating}
        categories={categories}
        history={history}
        postToEdit={postToEdit}
      />
    );
  }
};


const mapStateToProps = state => ({
  categories: state.categories,
  postToEdit: state.postToEdit,
});

const mapDispatchToProps = dispatch => ({
  addPost: post => dispatch(addPost(post)),
  editPost: post => dispatch(editPost(post)),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);



