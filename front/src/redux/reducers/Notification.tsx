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
      toast.error('Login failed')
      return { ...state };

    case actionTypes.SIGNUP_SUCCESS:
      toast.success('Registration completed successfully!')
      return { ...state };

    case actionTypes.SIGNUP_FAILURE:
      toast.error('Signup failed')
      return { ...state };

    default:
      return state;
  }
}

export default Notification;
