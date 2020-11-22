import * as actionTypes from '../actionTypes';
import * as URLs from './urls';
import { CALL_API } from '../middleware/api/api';

export const likeWorkShop = () => ({ //todo
  [CALL_API]: {
    types: [
      actionTypes.LIKE_WORKSHOP_REQUEST,
      actionTypes.LIKE_WORKSHOP_SUCCESS,
      actionTypes.LIKE_WORKSHOP_FAILURE,
    ],
    url: URLs.ROOT,
    fetchOptions: {
      method: '', //todo
      body: {}, // todo
    },
  },
});
