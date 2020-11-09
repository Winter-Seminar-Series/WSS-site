import * as actionTypes from '../actionTypes';

const initState = { token: null, isFetching: false, isLoggedIn: false, user: {} };

function account(state = initState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return ({
        isFetching: true,
      })

    case actionTypes.LOGIN_SUCCESS:
      return ({
        isFetching: false,
        isLoggedIn: true,
        token: action.response.access,
      })

    case actionTypes.LOGIN_FAILURE:
      return ({
        isFetching: false,
      })

    case actionTypes.LOGOUT_REQUEST:
      return ({
        isFetching: true,
      })

    case actionTypes.LOGOUT_SUCCESS:
      return ({
        isFetching: false,
        isLoggedIn: false,
        user: {},
      })

    case actionTypes.LOGOUT_FAILURE:
      return ({
        isFetching: false,
      })
      
    default:
      return state;
  }
}

export default account;
