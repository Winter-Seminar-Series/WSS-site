import * as actionTypes from '../actionTypes';
import * as URLs from './urls';
import { CALL_API } from '../middleware/api/api';

export const getWSSPrimitiveFields = (series: string) => ({
  [CALL_API]: {
    types: [
      actionTypes.PRIMITIVE_FIELDS_REQUEST,
      actionTypes.PRIMITIVE_FIELDS_SUCCESS,
      actionTypes.PRIMITIVE_FIELDS_FAILURE,
    ],
    url: `${URLs.ROOT}${series}/wss/`,
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const MODEL_LISTS_NAMES = {
  WORKSHOPS: 'workshops',
  SPEAKERS: 'speakers',
  SEMINARS: 'seminars',
  POSTERSESSIONS: 'postersessions',
  ANNOUNCEMENT: 'announcements',
  VENUES: 'venues',
  STAFF: 'staff',
  SPONSORS: 'sponsors',
  SPONSORSHIPS: 'sponsorships',
  CLIPS: 'clips',
  TAGS: 'tags',
  IMAGES: 'images',
  HOLDING_TEAMS: 'holding_teams',
  SEMINAR_MATERIALS: 'seminar_materials',
  WORKSHOP_MATERIALS: 'workshop_materials',
  POSTER_MATERIALS: 'poster_materials',
};

export const getAnEntityOfModelList = (
  modelListName: string,
  series: string,
  pk: number
) => ({
  [CALL_API]: {
    types: [
      actionTypes.AN_ENTITY_OF_MODEL_LIST_REQUEST,
      actionTypes.AN_ENTITY_OF_MODEL_LIST_SUCCESS,
      actionTypes.AN_ENTITY_OF_MODEL_LIST_FAILURE,
    ],

    payload: {
      modelListName,
      pk,
    },

    url: `${URLs.ROOT}${series}/${modelListName}/${pk}/`,
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const getModelList = (modelListName: string, series: string) => ({
  [CALL_API]: {
    types: [
      actionTypes.MODEL_LIST_REQUEST,
      actionTypes.MODEL_LIST_SUCCESS,
      actionTypes.MODEL_LIST_FAILURE,
    ],

    payload: {
      modelListName,
    },

    url: `${URLs.ROOT}${series}/${modelListName}/`,
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const getModelListCount = (modelListName: string, series: string) => ({
  [CALL_API]: {
    types: [
      actionTypes.MODEL_LIST_COUNT_REQUEST,
      actionTypes.MODEL_LIST_COUNT_SUCCESS,
      actionTypes.MODEL_LIST_COUNT_FAILURE,
    ],

    payload: {
      modelListName,
    },

    url: `${URLs.ROOT}${series}/${modelListName}/count/`,
    fetchOptions: {
      method: 'GET',
    },
  },
});
