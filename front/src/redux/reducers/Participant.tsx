import * as actionTypes from '../actionTypes';

const initState = {
  isFetching: false,
  likedWorkShops: [],
  likedPresentations: [],
};

function Participant(state = initState, action) {
  switch (action.type) {

    case actionTypes.LIKED_PRESENTATION_REQUEST:
      return {
        isFetching: true,
      }

    case actionTypes.LIKED_PRESENTATION_SUCCESS:
      return {
        isFetching: false,

      }

    case actionTypes.LIKED_PRESENTATION_FAILURE:
      return {
        isFetching: false,

      }

    ////

    case actionTypes.LIKE_WORKSHOP_REQUEST:
      return {

      }

    case actionTypes.LIKE_WORKSHOP_SUCCESS:
      return {
        isFetching: false,

      }

    case actionTypes.LIKE_WORKSHOP_FAILURE:
      return {
        isFetching: false,

      }

    ////



    default:
      return state;
  }
}

export default Participant;
