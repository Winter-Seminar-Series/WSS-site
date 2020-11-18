import * as actionTypes from '../actionTypes';

const initState = {
  isFetching: false,
  allWorkShops: [],
  allPresentations: [],
};

function WSS(state = initState, action) {
  switch (action.type) {
    case actionTypes.ALL_WORKSHOPS_REQUEST:
      return {
        isFetching: true,
      }

    case actionTypes.ALL_WORKSHOPS_SUCCESS:
      return {
        isFetching: false,

      }

    case actionTypes.ALL_WORKSHOPS_FAILURE:
      return {
        isFetching: false,

      }

    case actionTypes.ALL_PRESENTATIONS_REQUEST:
      return {
        isFetching: true,

      }

    case actionTypes.ALL_PRESENTATIONS_SUCCESS:
      return {
        isFetching: false,

      }

    case actionTypes.ALL_PRESENTATIONS_FAILURE:
      return {
        isFetching: false,

      }

    default:
      return state;
  }
}

export default WSS;

