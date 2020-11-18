import * as actionTypes from '../actionTypes';

const defaultState = {
  notifications: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.ENQUEUE_SNACKBAR:
      return enquequeSnackbar({ state, ...action });

    case actionTypes.CLOSE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          action.dismissAll || notification.key === action.key
            ? { ...notification, dismissed: true }
            : { ...notification }
        ),
      };

    case actionTypes.REMOVE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.key !== action.key
        ),
      };

    case actionTypes.LOGIN_FAILURE:
      return enquequeSnackbar({
        state,
        notification: {
          message: action.error,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: 'error',
            autoHideDuration: 3000,
          },
        },
      });
    case actionTypes.LOGIN_SUCCESS:
      return enquequeSnackbar({
        state,
        notification: {
          message: action.type,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: 'success',
            autoHideDuration: 3000,
          },
        },
      });
    default:
      return state;
  }
};

const enquequeSnackbar = ({ state, notification }) => ({
  ...state,
  notifications: [
    ...state.notifications,
    {
      key: notification.options.key,
      ...notification,
    },
  ],
});
