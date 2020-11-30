import * as actionTypes from '../actionTypes';
import * as URLs from './urls';
import { CALL_API } from '../middleware/api/api';

export const signup = (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => ({
  [CALL_API]: {
    types: [
      actionTypes.SIGNUP_REQUEST,
      actionTypes.SIGNUP_SUCCESS,
      actionTypes.SIGNUP_FAILURE,
    ],
    url: URLs.SIGNUP,
    fetchOptions: {
      method: 'POST',
      body: { firstName, lastName, email, password },
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
      method: 'POST', //todo?
    },
  },
});

// export const enqueueSnackbar = ({
//   key = new Date().getTime() + Math.random(),
//   ...notification
// }) => ({
//   type: actionTypes.ENQUEUE_SNACKBAR,
//   notification: {
//     ...notification,
//     key,
//   },
// });

// export const closeSnackbar = (key) => ({
//   type: actionTypes.CLOSE_SNACKBAR,
//   dismissAll: !key,
//   key,
// });

// export const removeSnackbar = (key) => ({
//   type: actionTypes.REMOVE_SNACKBAR,
//   key,
// });

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