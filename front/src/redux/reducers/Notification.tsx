import * as actionTypes from '../actionTypes';
import { toast } from 'react-toastify';
import { Link, useHistory } from 'react-router-dom';

const initState = {
  isFetching: false,
};

function Notification(state = {}, action) {

  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      toast.success('Welcome back!');
      return { ...state };

    case actionTypes.LOGIN_FAILURE:
      toast.error('Wrong username or password');
      return { ...state };

    case actionTypes.REGISTER_SUCCESS:
      toast.success('Welcome to WSS!');
      return { ...state };

    case actionTypes.REGISTER_FAILURE:
      toast.error(action.error);
      return { ...state };

    case actionTypes.VERIFY_PAYMENT_REQUEST:
      toast.warning('Your payment is in process...',
        {
          autoClose: false,
          closeOnClick: false,
          draggable: false,
        }
      );
      return { ...state };

    case actionTypes.VERIFY_PAYMENT_SUCCESS:
      toast.success('Your payment has been successfully done.',
        {
          autoClose: false,
          closeOnClick: false,
          draggable: false,
        }
      );
      return { ...state };

    case actionTypes.SEND_PAYMENT_FAILURE:
    case actionTypes.VERIFY_PAYMENT_FAILURE:
      toast.error(action.error,
        {
          autoClose: false,
          closeOnClick: false,
          draggable: false,
        }
      );
      return { ...state };

    case actionTypes.UPDATE_PROFILE_SUCCESS:
      toast.success('Information updated successfully.');
      return { ...state };

    case actionTypes.UPDATE_PROFILE_FAILURE:
      toast.error('Something went wrong, your information didn\'t update.');
      return { ...state };

    case actionTypes.CHANGE_PASSWORD_SUCCESS:
      toast.success('Password updated successfully.');
      return { ...state };

    case actionTypes.CHANGE_PASSWORD_FAILURE:
      toast.error('Wrong old password');
      return { ...state };

    case actionTypes.REQUEST_PASSWORD_RESET_SUCCESS:
      toast.success('Instructions to reset password have been sent to you. Please check your email.');
      return { ...state };

    case actionTypes.REGISTER_WORKSHOP_FAILURE:
    case actionTypes.CANCEL_WORKSHOP_REGISTRATION_FAILURE:
    case actionTypes.REQUEST_PASSWORD_RESET_FAILURE:
      toast.error(action.error);
      return { ...state };

    case actionTypes.RESET_PASSWORD_SUCCESS:
      toast.success('Password changed successfully.')
      return { ...state };

    case actionTypes.RESET_PASSWORD_FAILURE:
      toast.error(action.error);
      return { ...state };

    case actionTypes.REGISTER_WORKSHOP_SUCCESS:
      toast.success('You registered the workshop successfully.')
      return { ...state };

    case actionTypes.CANCEL_WORKSHOP_REGISTRATION_SUCCESS:
      toast.success('You canceled your registration in the workshop successfully.')
      return { ...state };

    default:
      return state;
  }
}

export default Notification;
