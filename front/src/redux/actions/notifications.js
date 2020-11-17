import * as actionTypes from '../actionTypes';

export const enqueueSnackbar = ({
  key = new Date().getTime() + Math.random(),
  ...notification
}) => ({
  type: actionTypes.ENQUEUE_SNACKBAR,
  notification: {
    ...notification,
    key,
  },
});

export const closeSnackbar = (key) => ({
  type: actionTypes.CLOSE_SNACKBAR,
  dismissAll: !key,
  key,
});

export const removeSnackbar = (key) => ({
  type: actionTypes.REMOVE_SNACKBAR,
  key,
});
