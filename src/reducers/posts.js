import {
  CHOSEN_POST_ID,
  CHOSEN_POST,
  POSTS,
  CATEGORIZED_POSTS,
  POST_SAVED,
  VOTED_POST,
  REMOVED_VOTE,
  POST_TO_EDIT,
  REMOVE_POST_TO_EDIT,
  ORDER_POSTS_BY_SCORE,
  ORDER_POSTS_BY_DATE,
} from '../actions/posts';

const posts = (state = [], action) => {
  switch (action.type) {
    case POSTS :
      const { posts } = action;

      return posts;

    default :
      return state;
  }
};

const chosenPostId = (state = null, action) => {
  switch (action.type) {
    case CHOSEN_POST_ID :
      const { id } = action;
      
      return id;

    default :
      return state;
  }
}

const chosenPost = (state = {}, action) => {
  switch (action.type) {
    case CHOSEN_POST :
      const { post } = action;
      post.date = new Date(post.timestamp);
      
      return post;

    default :
      return state;
  }
}

const postsByCategory = (state = [], action) => {
  switch (action.type) {
    case CATEGORIZED_POSTS :
      const { posts } = action;

      return posts;

    default :
      return state;
  }
};

const postSaved = (state = {}, action) => {
  switch(action.type) {
    case POST_SAVED:

        const { post } = action;
  
        return post;
  
    default :
      return state;
  }
};

const votedPosts = (state = [], action) => {
  switch(action.type) {
    case VOTED_POST:
      if (state.indexOf(action.postId) === -1) {
        return [ ...state, action.postId ];
      }

    case REMOVED_VOTE:
      return [ state.filter(postId => postId !== action.postId) ];
  
    default :
      return state;
  }
};

const postToEdit = (state = null, action) => {
  switch(action.type) {
    case POST_TO_EDIT:
      return action.post;

    case REMOVE_POST_TO_EDIT:
      return null;
  
    default :
      return state;
  }
};

const orderPostsBy = (state = 'voteScore', action) => {
  switch(action.type) {
    case ORDER_POSTS_BY_SCORE: 
      return 'voteScore';

    case ORDER_POSTS_BY_DATE:
      return 'timestamp';

    default: 
      return state;
  }
}

const postsReducer = {
  posts,
  chosenPostId,
  chosenPost,
  postsByCategory,
  postSaved,
  votedPosts,
  postToEdit,
  orderPostsBy,
};

export default postsReducer;
