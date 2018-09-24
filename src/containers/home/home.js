import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostPreview from '../../components-ui/post-preview';
import Categories from '../../components-ui/categories';

import { 
  getCategories,
  choseCategory,
  removeChosenCategory
} from '../../actions/categories';

import {
  getPosts,
  orderPosts,
  deletePost,
  addPostToEdit,
  chosenPost,
  removeVoteOnPost,
  voteOnPost,
  ORDER_POSTS_BY_SCORE,
  ORDER_POSTS_BY_DATE
} from '../../actions/posts';

import EmptyPosts from '../../components-ui/empty-posts';

import './home.css';

class Home extends React.Component {
  static fetchData(dispatch) {
    return Promise.all([
      dispatch(removeChosenCategory()),
      dispatch(getPosts()),
      dispatch(getCategories()),
    ]);
  }

  handleCategoryChosing = category => {
    const { history, choseCategory } = this.props;
    choseCategory(category);
    history.push(`/${category}`);
  }

  handlePostChosing = post => {
    const { history } = this.props;

    history.push(`/${post.category}/${post.id}`);
  }

  handlePostDeleting = (event, postId) => {
    event.stopPropagation();
    this.props.deletePost(postId);
  }

  handlerPostVote(event, post) {
    event.stopPropagation();
    this.props.voteOnPost(post).then(() => this.forceUpdate());
  }

  handlerPostRemoveVote(event, post) {
    event.stopPropagation();
    this.props.removeVoteOnPost(post).then(() => this.forceUpdate());
  }

  handlerPostEdit(event, chosenPost) {
    event.stopPropagation();
    const { addPostToEdit, history } = this.props;
    
    addPostToEdit(chosenPost);
    history.push(`/editar-post/${chosenPost.id}`);
  }

  componentDidMount() {
    Home.fetchData(this.props.dispatch);
  }

  render() {
    const {
      categories,
      chosenCategory,
      posts,
      orderPostsBy,
      orderPosts,
      history,
      votedPosts,
    } = this.props;

    return (
      <Fragment>
        <Categories
          categories={categories}
          choseCategory={this.handleCategoryChosing}
          chosenCategory={chosenCategory}
        />
        <button
          onClick={() => history.push('/novo-post')}
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
          posts && posts.length ? (
            posts.filter(post => !post.deleted)
            .sort((post1, post2) => 
              String(post1[orderPostsBy]) < String(post2[orderPostsBy])
            ).map(post => 
              <PostPreview
                post={post}
                key={post.id}
                choseCategory={this.handleCategoryChosing}
                chosePost={this.handlePostChosing}
                onDelete={this.handlePostDeleting}
                votedPosts={votedPosts}
                editPost={(event, post) => this.handlerPostEdit(event, post)}
                onVote={(event, post) => this.handlerPostVote(event, post)}
                onRemoveVote={(event, post) => this.handlerPostRemoveVote(event, post)}
              />
            )
          ) :
          <EmptyPosts />
        }
      </Fragment>
    )
  }
};

Home.propTypes = {
  posts: PropTypes.array,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ).isRequired,
  orderPostsBy: PropTypes.string.isRequired,
  votedPosts: PropTypes.array,
};

const mapStateToProps = state => ({
  posts: state.posts,
  categories: state.categories,
  orderPostsBy: state.orderPostsBy,
  chosenCategory: state.chosenCategory,
  votedPosts: state.votedPosts,
});

const mapDispatchToProps = dispatch => ({
  getPosts: () => dispatch(getCategories()),
  removeChosenCategory: () => dispatch(removeChosenCategory()),
  choseCategory: category => dispatch(choseCategory(category)),
  orderPosts: orderBy => dispatch(orderPosts(orderBy)),
  deletePost: postId => dispatch(deletePost(postId)),
  voteOnPost: post => dispatch(voteOnPost(post)),
  addPostToEdit: post => dispatch(addPostToEdit(post)),
  removeVoteOnPost: post => dispatch(removeVoteOnPost(post)),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
