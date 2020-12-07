import * as actionTypes from '../actionTypes';
import * as URLs from './urls';
import { CALL_API } from './middleware/api/api';

export const likeWorkShop = () => ({
  //todo
  [CALL_API]: {
    types: [
      actionTypes.LIKE_CARD_REQUEST,
      actionTypes.LIKE_CARD_SUCCESS,
      actionTypes.LIKE_CARD_FAILURE,
    ],
    url: URLs.ROOT,
    fetchOptions: {
      method: '', //todo
      body: {}, // todo
    },
  },
});
