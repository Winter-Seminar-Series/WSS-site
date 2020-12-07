import * as actionTypes from '../actionTypes';
import { toast } from 'react-toastify';

const initState = {
  isFetching: false,
};

function Notification(state = {}, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      toast.success('Welcome back!');
      return { ...state };

    case actionTypes.LOGIN_FAILURE:
      toast.error('Login failed');
      return { ...state };

    case actionTypes.REGISTER_SUCCESS:
      toast.success('Welcome to WSS!');
      return { ...state };

    case actionTypes.REGISTER_FAILURE:
      toast.error('Registration failed');
      return { ...state };

    case actionTypes.LOGOUT_SUCCESS:
      toast.error('You logged out successfully');
      return { ...state };

    // case actionTypes.REDIRECT_WHEN_USER_IS_NOT_LOGGED:
    //   toast.warning('You must log in before see that page');
    //   return { ...state };

    case actionTypes.VERIFY_PAYMENT_SUCCESS:
      toast.success('Your payment has been successfully done');
      return { ...state };
    default:
      return state;
  }
}

export default Notification;
