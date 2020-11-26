import { Action } from 'redux';
import * as actionTypes from '../actionTypes';

const initState = {
  isFetching: false,
  allWorkShops: [],
  allPresentations: [],
  mainImageURL: undefined,
  mainClipURL: undefined,
  bookletURL: undefined,
  staffCount: 0,
  isActive: false,
  isRegistrationOpen: false,
  participantsCount: 0,
  icalLink: undefined,
  year: 2020,
  startDate: undefined,
  proposalLink: undefined,
  showStats: undefined,
  calendarLink: undefined,
};

function WSS(state = initState, action) {
  switch (action.type) {

    case actionTypes.PRIMITIVE_FIELDS_REQUEST:
      return {
        ...state,
        isFetching: true,
      }

    case actionTypes.PRIMITIVE_FIELDS_SUCCESS:
      return ({
        ...state,
        isFetching: false,
        mainImageURL: action.response.main_image_url,
        mainClipURL: action.response.main_clip_url,
        bookletURL: action.response.booklet_url,
        staffCount: action.response.staff_count,
        isActive: action.response.is_active,
        isRegistrationOpen: action.response.is_registration_open,
        participantsCount: action.response.participants_count,
        icalLink: action.response.ical_link,
        year: action.response.year,
        startDate: action.response.start_date,
        proposalLink: action.response.proposal_link,
        showStats: action.response.show_stats,
        calendarLink: action.response.calender_link,
      })

    case actionTypes.PRIMITIVE_FIELDS_FAILURE:
      return ({
        ...state,
        isFetching: false,
      })

    /////////////////////

    case actionTypes.MODEL_LIST_REQUEST:
      return ({
        ...state,
        isFetching: true,
      })

    case actionTypes.MODEL_LIST_SUCCESS:
      return ({
        ...state,
        isFetching: false,
        [action.payload.modelListName]: action.response,
      })

    case actionTypes.MODEL_LIST_FAILURE:
      return ({
        ...state,
        isFetching: false,
      })

    /////////////////////

    case actionTypes.MODEL_LIST_COUNT_REQUEST:
      return ({
        ...state,
        isFetching: true,
      })

    case actionTypes.MODEL_LIST_COUNT_SUCCESS:
      return ({
        ...state,
        isFetching: false,
        [action.payload.modelListName + 'Count']: action.response,
      })

    case actionTypes.MODEL_LIST_COUNT_FAILURE:
      return ({
        ...state,
        isFetching: false,
      })

    /////////////////////      

    default:
      return state;
  }
}

export default WSS;

