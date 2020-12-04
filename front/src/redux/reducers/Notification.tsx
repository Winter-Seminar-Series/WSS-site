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

    case actionTypes.REGISTER_SUCCESS:
      toast.success('Registration completed successfully!')
      return { ...state };

    case actionTypes.REGISTER_FAILURE:
      toast.error('Registration failed')
      return { ...state };

    default:
      return state;
  }
}

export default Notification;
