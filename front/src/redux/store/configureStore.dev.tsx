import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import api from '../middleware/api/api';
import rootReducer from '../reducers';

const configureStoreDev = (preloadedState) => {
  const store = createStore(
    rootReducer,
    { ...preloadedState },
    compose(applyMiddleware(thunk, api, createLogger()))
  );

  return store;
};

export default configureStoreDev;
