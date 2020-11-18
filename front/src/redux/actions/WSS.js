import * as actionTypes from '../actionTypes';
import * as URLs from './urls';
import { CALL_API } from '../middleware/api/api';

export const getPosterSessions = () => ({
  [CALL_API]: {
    types: [
      actionTypes.REGISTER_REQUEST,
      actionTypes.REGISTER_SUCCESS,
      actionTypes.REGISTER_FAILURE,
    ],
    url: URLs.REGISTER,
    fetchOptions: {
      method: 'POST',
      body: { username, password },
    },
  },
});

export const getWorkShops = () => ({
  [CALL_API]: {
    types: [
      actionTypes.REGISTER_REQUEST,
      actionTypes.REGISTER_SUCCESS,
      actionTypes.REGISTER_FAILURE,
    ],
    url: URLs.REGISTER,
    fetchOptions: {
      method: 'POST',
      body: { username, password },
    },
  },
});
