import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getPostsByCategory,
  orderPosts,
  voteOnPost,
  removeVoteOnPost,
  addPostToEdit
} from '../../actions/posts';

import { choseCategory, getCategories } from '../../actions/categories';

import Categories from '../../components-ui/categories';
import PostPreview from '../../components-ui/post-preview';
import EmptyPosts from '../../components-ui/empty-posts';

const getCategoryIdFromQueryString = () => {
  const pathName = window.location.pathname;
  const params = pathName.split('/').filter(x => x !== '');

  return params[(params.length-1)];
}

class Category extends React.Component {
  static fetchData(params, dispatch) {
    return Promise.all([
      dispatch(getCategories()),
      dispatch(getPostsByCategory(getCategoryIdFromQueryString())),
      dispatch(choseCategory(getCategoryIdFromQueryString())),
    ]);
  }

  handlePostChosing = post => {
    const { history } = this.props;

    history.push(`/${post.category}/${post.id}`);
  }

  handlerPostVote(event, post) {
    event.stopPropagation();
    this.props.voteOnPost(post).then(() => this.forceUpdate());
  }

  handlerPostRemoveVote(event, post) {
    event.stopPropagation();
    this.props.removeVoteOnPost(post).then(() => this.forceUpdate());
  }

  handleCategoryChosing = category => {
    const { history, choseCategory } = this.props;
    choseCategory(category);
    history.push(`/${category}`);
  }
  
  handlerPostEdit(event, chosenPost) {
    event.stopPropagation();
    const { addPostToEdit, history } = this.props;
    
    addPostToEdit(chosenPost);
    history.push(`/editar-post/${chosenPost.id}`);
  }

  componentDidMount() {
    Category.fetchData(this.props, this.props.dispatch);
  }

  componentDidUpdate() {
    const { dispatch } = this.props;
    
    dispatch(getPostsByCategory(getCategoryIdFromQueryString()));
  }
  
  render() {
    const {
      categories,
      chosenCategory,
      postsByCategory,
      orderPostsBy,
      orderPosts,
      votedPosts
    } = this.props;

    return (
      <Fragment>
        <Categories
          categories={categories}
          choseCategory={this.handleCategoryChosing}
          chosenCategory={chosenCategory}
        />
        <button
          onClick={() => this.props.history.push('/novo-post')}
          className="new-post-button"
        >
          <i className="fa fa-3x fa-plus-circle" />
        </button>
        <p className="order-label">Ordenar por</p>
        <select
          className="order-posts"
          value={orderPostsBy}
          onChange={event => orderPosts(event.target.value)}
        >
          <option value="voteScore">Votos</option>
          <option value="timestamp">Data de criação</option>
        </select>
        {
          postsByCategory && postsByCategory.length ? (
            postsByCategory.sort((post1, post2) => 
              String(post1[orderPostsBy]) < String(post2[orderPostsBy])
            ).map(post => 
              <PostPreview
                post={post}
                key={post.id}
                choseCategory={this.handleCategoryChosing}
                onVote={(event, post) => this.handlerPostVote(event, post)}
                votedPosts={votedPosts}
                onRemoveVote={(event, post) => this.handlerPostRemoveVote(event, post)}
                editPost={(event, post) => this.handlerPostEdit(event, post)}
                chosePost={this.handlePostChosing}
              />
            )
          ) :
          <EmptyPosts />
        }
      </Fragment>
    )
  }
}

Category.propTypes = {
  chosenCategory: PropTypes.shape({
    name: PropTypes.string,
  }),
  orderPostsBy: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  chosenCategory: state.chosenCategory,
  orderPostsBy: state.orderPostsBy,
  categories: state.categories,
  votedPosts: state.votedPosts,
  postsByCategory: state.postsByCategory,
});

const mapDispatchToProps = dispatch => ({
  choseCategory: category => dispatch(choseCategory(category)),
  getPostsByCategory: chosenCategory => dispatch(getPostsByCategory(chosenCategory)),
  orderPosts: orderBy => dispatch(orderPosts(orderBy)),
  voteOnPost: post => dispatch(voteOnPost(post)),
  removeVoteOnPost: post => dispatch(removeVoteOnPost(post)),
  addPostToEdit: post => dispatch(addPostToEdit(post)),
  getCategories: () => dispatch(getCategories()),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);
