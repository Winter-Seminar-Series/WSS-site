import * as actionTypes from '../actionTypes';

const initState = {
  token: null,

  isFetching: false,
  isLoggedIn: false,
  user: {}
};

function account(state = initState, action) {
  switch (action.type) {
    case actionTypes.REGISTER_REQUEST:
      return ({
        isFetching: true,
      })

    case actionTypes.REGISTER_SUCCESS:
      return ({
        id: action.response.user.id,
        username: action.response.user.username,
        email: action.response.user.email,
        token: action.response.token,
        isFetching: false,
      })

    case actionTypes.REGISTER_FAILURE:
      console.log(action.response)
      return ({
        isFetching: false,
      })

    case actionTypes.LOGIN_REQUEST:
      return ({
        isFetching: true,
      })

    case actionTypes.LOGIN_SUCCESS:
      return ({
        isFetching: false,
        expiry: action.response.expiry,
        token: action.response.token,
      })

    case actionTypes.LOGIN_FAILURE:
      console.log(action.response)
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
