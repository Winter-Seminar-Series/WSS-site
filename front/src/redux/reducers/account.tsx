import { Redirect } from 'react-router-dom';
import * as actionTypes from '../actionTypes';

const initState = {
  thisYear: 2020,
  isFetching: false,
  isLoggedIn: false,
  doesResetPasswordCompleted: false,
  id: '',
  username: '',
  email: '',
  token: '',
  expiry: '',
};

function account(state = initState, action) {
  switch (action.type) {
    case actionTypes.REGISTER_REQUEST:
      return {
        ...state,
        isFetching: true,
        isLoggedIn: false,
      };

    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        id: action.response.user.id,
        username: action.response.user.username,
        email: action.response.user.email,
        token: action.response.token,
        isLoggedIn: true,
        isFetching: false,
      };

    case actionTypes.REGISTER_FAILURE:
      return {
        ...state,
        isFetching: false,
        isLoggedIn: false,
      };

    ///////////////////

    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLoggedIn: false,
        isFetching: true,
      };

    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoggedIn: true,
        expiry: action.response.expiry,
        token: action.response.token,
      };

    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        isFetching: false,
      };

    ///////////////////

    case actionTypes.LOGOUT_REQUEST:
      return initState;

    ///////////////////
    case actionTypes.SEND_PAYMENT_REQUEST:
      return ({
        ...state,
        isFetching: true,
      })

    case actionTypes.SEND_PAYMENT_SUCCESS:
      var link = document.createElement('a');
      link.href = action.response.redirect_url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return {
        ...state,
        redirect_url: action.response.redirect_url,
        isFetching: false,
      };

    case actionTypes.SEND_PAYMENT_FAILURE:
      return ({
        ...state,
        isFetching: false,
      })

    ///////////////////

    case actionTypes.REQUEST_PASSWORD_RESET_REQUEST:
      return ({
        ...state,
        isFetching: true,
        doesResetPasswordCompleted: false,
      })

    case actionTypes.REQUEST_PASSWORD_RESET_SUCCESS:
      return ({
        ...state,
        isFetching: false,
        doesResetPasswordCompleted: false,
      })

    case actionTypes.REQUEST_PASSWORD_RESET_FAILURE:
      return ({
        ...state,
        isFetching: false,
        doesResetPasswordCompleted: false,
      })

    //////////////////////////

    case actionTypes.RESET_PASSWORD_REQUEST:
      return ({
        ...state,
        isFetching: true,
        doesResetPasswordCompleted: false,
      })

    case actionTypes.RESET_PASSWORD_SUCCESS:
      return ({
        ...state,
        isFetching: false,
        doesResetPasswordCompleted: true,
      })

    case actionTypes.RESET_PASSWORD_FAILURE:
      return ({
        ...state,
        isFetching: false,
        doesResetPasswordCompleted: false,
      })

    /////////////////////////

    case actionTypes.CHANGE_THIS_YEAR:
      return ({
        ...state,
        thisYear: action.payload.thisYear,
      })

    default:
      return state;
  }
}

export default account;
