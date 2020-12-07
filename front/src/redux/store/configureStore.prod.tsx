import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import api from '../actions/middleware/api/api';
import rootReducer from '../reducers';

const configureStore = (preloadedState) =>
  createStore(
    rootReducer,
    { Intl: { locale: 'fa' }, ...preloadedState },
    applyMiddleware(thunk, api)
  );
export default configureStore;
