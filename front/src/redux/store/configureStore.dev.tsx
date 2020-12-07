import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import api from '../actions/middleware/api/api';
import rootReducer from '../reducers';
import DevTools from './DevTools';

const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    { ...preloadedState },
    compose(applyMiddleware(thunk, api, createLogger()), DevTools.instrument())
  );

  return store;
};

export default configureStore;
