import { combineReducers } from 'redux';
import account from './account';
import WSS from './WSS';
import Participant from './Participant';
import Notification from './Notification';

const allReducers = combineReducers({
  account,
  WSS,
  Participant,
  Notification,
});

export default allReducers;
