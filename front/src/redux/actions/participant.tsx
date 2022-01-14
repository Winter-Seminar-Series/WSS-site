import * as actionTypes from '../actionTypes';
import * as URLs from './urls';
import { CALL_API } from '../middleware/api/api';

export const getProfile = () => ({
  [CALL_API]: {
    types: [
      actionTypes.GET_PROFILE_REQUEST,
      actionTypes.GET_PROFILE_SUCCESS,
      actionTypes.GET_PROFILE_FAILURE,
    ],
    url: `${URLs.ROOT}profile/`,
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
      actionTypes.UPDATE_PROFILE_FAILURE,
    ],
    url: `${URLs.ROOT}profile/edit/`,
    fetchOptions: {
      method: 'PUT',
      body: updatedData,
    },
  },
});

export const doesUserHaveRegistered = (series) => ({
  [CALL_API]: {
    types: [
      actionTypes.CHECK_USER_REGISTRATION_STATUS_REQUEST,
      actionTypes.CHECK_USER_REGISTRATION_STATUS_SUCCESS,
      actionTypes.CHECK_USER_REGISTRATION_STATUS_FAILURE,
    ],
    url: `${URLs.ROOT}profile/is_registered/?series=${series}`,
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const getRegisteredWorkshops = (series) => ({
  [CALL_API]: {
    types: [
      actionTypes.GET_REGISTERED_WORKSHOPS_REQUEST,
      actionTypes.GET_REGISTERED_WORKSHOPS_SUCCESS,
      actionTypes.GET_REGISTERED_WORKSHOPS_FAILURE,
    ],
    url: `${URLs.ROOT}${series}/registered-workshops`,
    fetchOptions: {
      method: 'GET',
    },
  },
});

const _registerWorkshop = (series, id) => ({
  [CALL_API]: {
    types: [
      actionTypes.REGISTER_WORKSHOP_REQUEST,
      actionTypes.REGISTER_WORKSHOP_SUCCESS,
      actionTypes.REGISTER_WORKSHOP_FAILURE,
    ],
    url: `${URLs.ROOT}${series}/workshops/${id}/register/`,
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const registerWorkshop = (series: string, id) => async (
  dispatch,
  getState
) => {
  await dispatch(_registerWorkshop(series, id));
  dispatch(getRegisteredWorkshops(series));
};

const _cancelWorkshopRegistration = (series: string, id) => ({
  [CALL_API]: {
    types: [
      actionTypes.CANCEL_WORKSHOP_REGISTRATION_REQUEST,
      actionTypes.CANCEL_WORKSHOP_REGISTRATION_SUCCESS,
      actionTypes.CANCEL_WORKSHOP_REGISTRATION_FAILURE,
    ],
    url: `${URLs.ROOT}${series}/workshops/${id}/cancel/`,
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const cancelWorkshopRegistration = (series: string, id) => async (
  dispatch,
  getState
) => {
  await dispatch(_cancelWorkshopRegistration(series, id));
  dispatch(getRegisteredWorkshops(series));
};

export const getRedirectURL = (series: string, type, id) => ({
  [CALL_API]: {
    types: [
      actionTypes.GET_REDIRECT_URL_REQUEST,
      actionTypes.GET_REDIRECT_URL_SUCCESS,
      actionTypes.GET_REDIRECT_URL_FAILURE,
    ],
    url: `${URLs.ROOT}${series}/${type}/${id}/open_webinar/`,
    fetchOptions: {
      method: 'GET',
    },
  },
});
