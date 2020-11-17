import { combineReducers } from 'redux';
import account from './account';
import notifications from './notifications';

const allReducers = combineReducers({
  account,
  notifications,
});
export default allReducers;
