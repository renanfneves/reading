import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


const store = (preloadedState = {}) => createStore(
  reducers,
  preloadedState,
  composeEnhancers(
    applyMiddleware(thunk),
  ),
);

export default store;
