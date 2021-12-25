import * as actionTypes from '../actionTypes';
import * as URLs from './urls';
import { CALL_API } from '../middleware/api/api';
import { BASE_URL } from '../../constants/info';

export const setThisYear = (thisYear) => ({
  type: actionTypes.CHANGE_THIS_YEAR,
  payload: {
    thisYear,
  },
});

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

export const sendPaymentRequest = (year = 2021) => {
  return {
    [CALL_API]: {
      types: [
        actionTypes.SEND_PAYMENT_REQUEST,
        actionTypes.SEND_PAYMENT_SUCCESS,
        actionTypes.SEND_PAYMENT_FAILURE,
      ],
      url: `${URLs.ROOT}${year}/payment/request/?callback=${BASE_URL}/dashboard`,
      fetchOptions: {
        method: 'GET',
      },
    },
  };
};

export const verifyPayment = (authority, status, year = 2021) => ({
  [CALL_API]: {
    types: [
      actionTypes.VERIFY_PAYMENT_REQUEST,
      actionTypes.VERIFY_PAYMENT_SUCCESS,
      actionTypes.VERIFY_PAYMENT_FAILURE,
    ],
    url: `${URLs.ROOT}${year}/payment/verify/?Authority=${authority}&Status=${status}`,
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const changePassword = (oldPassword, newPassword) => ({
  [CALL_API]: {
    types: [
      actionTypes.CHANGE_PASSWORD_REQUEST,
      actionTypes.CHANGE_PASSWORD_SUCCESS,
      actionTypes.CHANGE_PASSWORD_FAILURE,
    ],
    url: URLs.CHANGE_PASSWORD,
    fetchOptions: {
      method: 'PUT',
      body: {
        old_password: oldPassword,
        new_password: newPassword,
      },
    },
  },
});

export const requestPasswordReset = (email) => ({
  [CALL_API]: {
    types: [
      actionTypes.REQUEST_PASSWORD_RESET_REQUEST,
      actionTypes.REQUEST_PASSWORD_RESET_SUCCESS,
      actionTypes.REQUEST_PASSWORD_RESET_FAILURE,
    ],
    url: URLs.REQUEST_PASSWORD_RESET,
    fetchOptions: {
      method: 'POST',
      body: {
        email,
      },
    },
  },
});

export const resetPassword = (password, token) => ({
  [CALL_API]: {
    types: [
      actionTypes.RESET_PASSWORD_REQUEST,
      actionTypes.RESET_PASSWORD_SUCCESS,
      actionTypes.RESET_PASSWORD_FAILURE,
    ],
    url: URLs.RESET_PASSWORD,
    fetchOptions: {
      method: 'POST',
      body: {
        password,
        token,
      },
    },
  },
});
