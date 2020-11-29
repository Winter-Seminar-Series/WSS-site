import * as actionTypes from '../actionTypes';
import { toast } from 'react-toastify';

const initState = {
  isFetching: false,
};

function Notification(state = {}, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      toast.success('Welcome to WSS')
      return { ...state };

    case actionTypes.LOGIN_FAILURE:
      toast.error('Login Failed')
      return { ...state };

    case actionTypes.SIGNUP_SUCCESS:
      toast.success('Successful!')
      return { ...state };

    case actionTypes.SIGNUP_FAILURE:
      toast.error('Signup Failed')
      return { ...state };

    default:
      return state;
  }
}

export default Notification;
