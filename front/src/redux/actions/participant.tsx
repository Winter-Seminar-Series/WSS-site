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

export const getProfile = () => ({
  [CALL_API]: {
    types: [
      actionTypes.GET_PROFILE_REQUEST,
      actionTypes.GET_PROFILE_SUCCESS,
      actionTypes.GET_PROFILE_FAILURE,
    ],
    url: `${URLs.ROOT}profile`,
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const updateProfile = (updatedData: {
  first_name?: string;
  last_name?: string;
  phone_number?: number;
  age?: number;
  job?: string;
  university?: string;
  introduction_method?: string;
  gender?: string;
  city?: string;
  country?: string;
  field_of_interest?: string;
  grade?: number;
  is_student?: boolean;
}) => ({
  [CALL_API]: {
    types: [
      actionTypes.UPDATE_PROFILE_REQUEST,
      actionTypes.UPDATE_PROFILE_SUCCESS,
      actionTypes.UPDATE_PROFILE_SUCCESS,
    ],
    url: `${URLs.ROOT}profile/edit`,
    fetchOptions: {
      method: 'POST',
      body: updatedData,
    },
  },
});
