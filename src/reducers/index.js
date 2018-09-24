import { combineReducers } from 'redux';
import postsReducer from './posts';
import categoriesReducer from './categories';
import commentsReducer from './comments';

export default combineReducers(
  Object.assign(
    {},
    { constants: (state = {}) => state },
    postsReducer,
    categoriesReducer,
    commentsReducer,
  )
);
