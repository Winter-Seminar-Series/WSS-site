import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import api from '../middleware/api/api';
import rootReducer from '../reducers';

const configureStoreProd = (preloadedState) =>
  createStore(
    rootReducer,
    { ...preloadedState },
    applyMiddleware(thunk, api)
  );
export default configureStoreProd;
