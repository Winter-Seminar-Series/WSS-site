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
    url: `${URLs.ROOT}${year}/wss`,
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const MODEL_LISTS_NAMES = {
  WORKSHOPS: 'workshops',
  SPEAKERS: 'speakers',
  SEMINARS: 'seminars',
  STAFF: 'staff',
  POSTERSESSIONS: 'postersessions',
  SPONSORS: 'sponsors',
  SPONSORSHIPS: 'sponsorships',
  CLIPS: 'clips',
  HOLDING_TEAMS: 'holding_teams',
  IMAGES: 'images',
};

export const getModelList = (modelListName: string, year: number) => ({
  [CALL_API]: {
    types: [
      actionTypes.MODEL_LIST_REQUEST,
      actionTypes.MODEL_LIST_SUCCESS,
      actionTypes.MODEL_LIST_FAILURE,
    ],

    payload: {
      modelListName,
    },

    url: `${URLs.ROOT}${year}/${modelListName}`,
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const getModelListCount = (modelListName: string, year: number) => ({
  [CALL_API]: {
    types: [
      actionTypes.MODEL_LIST_COUNT_REQUEST,
      actionTypes.MODEL_LIST_COUNT_SUCCESS,
      actionTypes.MODEL_LIST_COUNT_FAILURE,
    ],

    payload: {
      modelListName,
    },

    url: `${URLs.ROOT}${year}/${modelListName}/count`,
    fetchOptions: {
      method: 'GET',
    },
  },
});
