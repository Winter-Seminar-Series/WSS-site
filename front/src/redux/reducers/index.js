import { combineReducers } from 'redux';
import Account from './Account';
import notifications from './notifications';
import WSS from './WSS';
import Participant from './Participant';


const allReducers = combineReducers({
  Account,
  notifications,
  WSS,
  Participant,
});
export default allReducers;
