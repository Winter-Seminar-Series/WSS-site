import * as actionTypes from '../actionTypes';
import * as URLs from './urls';
import { CALL_API } from '../middleware/api/api';

export const getWSSPrimitiveFields = (year: number) => ({
  [CALL_API]: {
    types: [
      actionTypes.PRIMITIVE_FIELDS_REQUEST,
      actionTypes.PRIMITIVE_FIELDS_SUCCESS,
      actionTypes.PRIMITIVE_FIELDS_FAILURE,
    ],
    url: URLs.ROOT + '/' + year + '/wss',
    fetchOptions: {
      method: 'GET',
    },
  }
})

export const getModelList = (modelList: string, year: number) => ({
  [CALL_API]: {
    types: [
      actionTypes.MODEL_LIST_REQUEST,
      actionTypes.MODEL_LIST_SUCCESS,
      actionTypes.MODEL_LIST_FAILURE,
    ],
    url: URLs.ROOT + '/' + year + '/' + modelList,
    fetchOptions: {
      method: 'GET',
    },
  },
});

