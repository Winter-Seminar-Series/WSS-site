import * as actionTypes from '../actionTypes';
const ARRAY_SIZE = 200;

const initState = {
  isFetching: false,
  mainImageURL: undefined,
  mainClipURL: undefined,
  bookletURL: undefined,
  staffCount: 0,
  isActive: false,
  isRegistrationOpen: false,
  participantsCount: 0,
  icalLink: undefined,
  thisYear: 2021,
  startDate: undefined,
  endDate: undefined,
  proposalLink: undefined,
  showStats: undefined,
  calendarLink: undefined,

  workshops: [],
  workshops_count: 0,
  workshop_materials: [],
  workshop_materials_count: 0,
  seminars: [],
  seminars_count: 0,
  seminar_materials: [],
  seminar_materials_count: 0,
  speakers: [],
  speakers_count: 0,
  postersessions: [],
  postersessions_count: 0,
  poster_materials: [],
  poster_materials_count: 0,
  sponsors: [],
  sponsors_count: 0,
  sponsorships: [],
  sponsorships_count: 0,
  clips: [],
  clips_count: 0,
  holding_teams: [],
  holding_teams_count: 0,
  staff: [],
  staff_count: 0,
  images: [],
  images_count: 0,
  tags: [],
  tags_count: 0,
  announcements: [],
  announcements_count: 0,
  venues: [],
  venues_count: 0,
};

function WSS(state = initState, action) {
  switch (action.type) {
    case actionTypes.PRIMITIVE_FIELDS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case actionTypes.PRIMITIVE_FIELDS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        mainImageURL: action.response.main_image_url,
        mainClipURL: action.response.main_clip_url,
        bookletURL: action.response.booklet_url,
        staffCount: action.response.staff_count,
        isActive: action.response.is_active,
        isRegistrationOpen: action.response.is_registration_open,
        isWorkshopRegistrationOpen: action.response.workshop_registration_open,
        participantsCount: action.response.participants_count,
        icalLink: action.response.ical_link,
        year: action.response.year,
        startDate: action.response.start_date,
        endDate: action.response.end_date,
        proposalLink: action.response.proposal_link,
        showStats: action.response.show_stats,
        calendarLink: action.response.calendar_link,
      };

    case actionTypes.PRIMITIVE_FIELDS_FAILURE:
      return {
        ...state,
        isFetching: false,
      };

    /////////////////////

    case actionTypes.MODEL_LIST_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case actionTypes.MODEL_LIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        [action.payload.modelListName]: action.response,
      };

    case actionTypes.MODEL_LIST_FAILURE:
      return {
        ...state,
        isFetching: false,
      };

    /////////////////////

    case actionTypes.MODEL_LIST_COUNT_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case actionTypes.MODEL_LIST_COUNT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        [`${action.payload.modelListName}_count`]: action.response.count,
      };

    case actionTypes.MODEL_LIST_COUNT_FAILURE:
      return {
        ...state,
        isFetching: false,
      };

    /////////////////////

    case actionTypes.AN_ENTITY_OF_MODEL_LIST_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case actionTypes.AN_ENTITY_OF_MODEL_LIST_SUCCESS:
      return {
        ...state,
        [action.payload.modelListName]: [
          ...state[action.payload.modelListName],
          action.response,
        ],
      };

    case actionTypes.AN_ENTITY_OF_MODEL_LIST_FAILURE:
      return {
        ...state,
        isFetching: false,
      };

    default:
      return state;
  }
}

export default WSS;
