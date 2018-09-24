import * as PostAPI from '../utils/postAPI';

export const CHOSEN_POST_ID = 'CHOSEN_POST_ID';
export const CHOSEN_POST = 'CHOSEN_POST';
export const POSTS = 'POSTS';
export const POST_SAVED = 'POST_SAVED';
export const CATEGORIZED_POSTS = 'CATEGORIZED_POSTS';
export const VOTED_POST = 'VOTED_POST';
export const REMOVED_VOTE = 'REMOVED_VOTE';
export const POST_TO_EDIT = 'POST_TO_EDIT';
export const REMOVE_POST_TO_EDIT = 'REMOVE_POST_TO_EDIT';
export const ORDER_POSTS_BY_SCORE = 'ORDER_POSTS_BY_SCORE';
export const ORDER_POSTS_BY_DATE = 'ORDER_POSTS_BY_DATE';

export const setChosenPost = post => ({
  type: CHOSEN_POST,
  post,
});

export const postSaved = post => ({
  type: POST_SAVED,
  post,
});

export const availablePosts = posts => ({
  type: POSTS,
  posts,
});

export const votedPost = postId => ({
  type: VOTED_POST,
  postId,
});

export const removedVote = postId => ({
  type: REMOVED_VOTE,
  postId,
})

export const postsByCategory = posts => ({
  type: CATEGORIZED_POSTS,
  posts,
});

export const addPostToEdit = post => ({
  type: POST_TO_EDIT,
  post,
});

export const removePostToEdit = post => ({
  type: REMOVE_POST_TO_EDIT,
  post,
});

export const orderPosts = orderBy => {
  const type = orderBy === 'voteScore' ? ORDER_POSTS_BY_SCORE: ORDER_POSTS_BY_DATE;
  return {
    type
  }
};

export const getPost = id => dispatch => (
  PostAPI
    .getPost(id)
      .then(response => dispatch(setChosenPost(response)))
);

export const addPost = post => dispatch => (
  PostAPI
    .addPost(post)
      .then(response => dispatch(postSaved(response)))
);

export const getPosts = () => dispatch => (
  PostAPI
    .getPosts()
      .then(posts => dispatch(availablePosts(posts)))
);

export const deletePost = id => dispatch => (
  PostAPI
    .deletePost(id)
      .then(() => dispatch(getPosts()))
);

export const getPostsByCategory = category => dispatch => (
  PostAPI
    .getPostsByCategory(category)
      .then(posts => dispatch(postsByCategory(posts)))
);

export const voteOnPost = post => dispatch => (
  PostAPI
    .updatePostVote(post.id, 'upVote')
      .then(() => {
        post.voteScore++;

        return dispatch(setChosenPost(post))
      })
      .then(() => dispatch(votedPost(post.id)))
);

export const removeVoteOnPost = post => dispatch => (
  PostAPI
    .updatePostVote(post.id, 'downVote')
      .then(() => {
        post.voteScore--;

        return dispatch(setChosenPost(post))
      })
      .then(() => dispatch(removedVote(post.id)))
);

export const editPost = post => dispatch => (
  PostAPI
    .editPost(post)
      .then(() => dispatch(removePostToEdit(post)))
);

