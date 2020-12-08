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
  year: 2020,
  startDate: undefined,
  proposalLink: undefined,
  showStats: undefined,
  calendarLink: undefined,

  workshops: new Array(ARRAY_SIZE),
  workshops_count: 0,
  workshop_materials: new Array(ARRAY_SIZE),
  workshop_materials_count: 0,
  seminars: new Array(ARRAY_SIZE),
  seminars_count: 0,
  seminar_materials: new Array(ARRAY_SIZE),
  seminar_materials_count: 0,
  speakers: new Array(ARRAY_SIZE),
  speakers_count: 0,
  postersessions: new Array(ARRAY_SIZE),
  postersessions_count: 0,
  poster_materials: new Array(ARRAY_SIZE),
  poster_materials_count: 0,
  sponsors: new Array(ARRAY_SIZE),
  sponsors_count: 0,
  sponsorships: new Array(ARRAY_SIZE),
  sponsorships_count: 0,
  clips: new Array(ARRAY_SIZE),
  clips_count: 0,
  holding_teams: new Array(ARRAY_SIZE),
  holding_teams_count: 0,
  staff: new Array(ARRAY_SIZE),
  staff_count: 0,
  images: new Array(ARRAY_SIZE),
  images_count: 0,
  tags: new Array(ARRAY_SIZE),
  tags_count: 0,
  announcements: new Array(ARRAY_SIZE),
  announcements_count: 0,
  venues: new Array(ARRAY_SIZE),
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
        participantsCount: action.response.participants_count,
        icalLink: action.response.ical_link,
        year: action.response.year,
        startDate: action.response.start_date,
        proposalLink: action.response.proposal_link,
        showStats: action.response.show_stats,
        calendarLink: action.response.calender_link,
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
        [action.payload.modelListName + '_count']: action.response,
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
      const modelList = state[action.payload.modelListName];
      const pk = action.payload.pk;
      return {
        ...state,
        [action.payload.modelListName]:
          [...modelList.slice(0, pk), action.response, ...modelList.slice(pk + 1, modelList.length)],
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
