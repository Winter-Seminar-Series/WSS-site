import { combineReducers } from 'redux';
import Account from './Account';
import WSS from './WSS';
import Participant from './Participant';


const allReducers = combineReducers({
  Account,
  WSS,
  Participant,
});
export default allReducers;
