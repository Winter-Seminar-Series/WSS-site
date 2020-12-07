import * as actionTypes from '../actionTypes';
import * as URLs from './urls';
import { CALL_API } from './middleware/api/api';
import { BASE_URL } from '../../constants/info';

export const register = (
  username: string,
  email: string,
  password: string
) => ({
  [CALL_API]: {
    types: [
      actionTypes.REGISTER_REQUEST,
      actionTypes.REGISTER_SUCCESS,
      actionTypes.REGISTER_FAILURE,
    ],
    url: URLs.REGISTER,
    fetchOptions: {
      method: 'POST',
      body: { username, password, email },
    },
  },
});

export const login = (username: string, password: string) => ({
  [CALL_API]: {
    types: [
      actionTypes.LOGIN_REQUEST,
      actionTypes.LOGIN_SUCCESS,
      actionTypes.LOGIN_FAILURE,
    ],
    url: URLs.LOGIN,
    payload: {
      username,
    },
    fetchOptions: {
      method: 'POST',
      body: { username, password },
    },
  },
});

export const logout = () => ({
  [CALL_API]: {
    types: [
      actionTypes.LOGOUT_REQUEST,
      actionTypes.LOGOUT_SUCCESS,
      actionTypes.LOGOUT_FAILURE,
    ],
    url: URLs.LOGOUT,
    fetchOptions: {
      method: 'POST',
    },
  },
});

export const redirectWhenUserIsNotLoggedIn = () => ({
  type: actionTypes.REDIRECT_WHEN_USER_IS_NOT_LOGGED,
});

export const sendPaymentRequest = (year = 2020) => ({
  [CALL_API]: {
    types: [
      actionTypes.SEND_PAYMENT_REQUEST,
      actionTypes.SEND_PAYMENT_SUCCESS,
      actionTypes.SEND_PAYMENT_FAILURE,
    ],
    url: `${URLs.ROOT}${year}/payment/request?callback=${BASE_URL}/dashboard`,
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const verifyPayment = (verificationCode, year = 2020) => ({
  [CALL_API]: {
    types: [
      actionTypes.VERIFY_PAYMENT_REQUEST,
      actionTypes.VERIFY_PAYMENT_SUCCESS,
      actionTypes.VERIFY_PAYMENT_FAILURE,
    ],
    url: `${URLs.ROOT}${year}/payment/verify${verificationCode}`,
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const removePaymentData = () => ({
  type: actionTypes.REMOVE_PAYMENT_DATA,
});
