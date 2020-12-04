import { combineReducers } from 'redux';
import Account from './Account';
import WSS from './WSS';
import Participant from './Participant';
import Notification from './Notification';

const allReducers = combineReducers({
  Account,
  WSS,
  Participant,
  Notification,
});

export default allReducers;
