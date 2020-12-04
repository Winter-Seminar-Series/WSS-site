import * as actionTypes from '../actionTypes';
import * as URLs from './urls';
import { CALL_API } from '../middleware/api/api';

export const signup = (
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

export const redirectWhenUserIsNotLoggedIn = () => (
  dispatch,
  getState
) => {
  const toast = {
    type: actionTypes.REDIRECT_WHEN_USER_IS_NOT_LOGGED,
  }
  return dispatch(toast);
};


// const fetchUser = () => ({
//   [CALL_API]: {
//     types: [
//       actionTypes.USER_REQUEST,
//       actionTypes.USER_SUCCESS,
//       actionTypes.USER_FAILURE,
//     ],
//     url: URLs.GET_ACCOUNT_BY_USERNAME,
//     fetchOptions: {
//       method: 'GET',
//     },
//   },
// });

// export const loadUser = () => (
//   dispatch,
//   getState
// ) => {
//   const user = getState().users[getState().account.username];
//   if (user) {
//     return null;
//   }
//   return dispatch(fetchUser());
// };
