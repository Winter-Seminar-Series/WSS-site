import * as actionTypes from '../actionTypes';

const initState = {
<<<<<<< HEAD:front/src/redux/reducers/Account.tsx
  token: null,
  isFetching: false,
  isLoggedIn: false,
  user: {}
=======
  isFetching: false,
  isLoggedIn: false,
  id: '',
  username: '',
  email: '',
  token: '',
  expiry: '',
>>>>>>> temporary_front:front/src/redux/reducers/account.tsx
};

function Account(state = initState, action) {
  switch (action.type) {
<<<<<<< HEAD:front/src/redux/reducers/Account.tsx
    case actionTypes.SIGNUP_REQUEST:
      return ({
        isFetching: true,
      })

    case actionTypes.SIGNUP_SUCCESS:
      return ({
        isFetching: false,
      })

    case actionTypes.SIGNUP_FAILURE:
      return ({
        isFetching: false,
      })
=======
    case actionTypes.REGISTER_REQUEST:
      return ({
        isFetching: true,
        isLoggedIn: false,
      })

    case actionTypes.REGISTER_SUCCESS:
      return ({
        id: action.response.user.id,
        username: action.response.user.username,
        email: action.response.user.email,
        token: action.response.token,
        isLoggedIn: true,
        isFetching: false,
      })

    case actionTypes.REGISTER_FAILURE:
      console.log(action.response)
      return (initState)
>>>>>>> temporary_front:front/src/redux/reducers/account.tsx

    case actionTypes.LOGIN_REQUEST:
      return ({
        isLoggedIn: false,
        isFetching: true,
      })

    case actionTypes.LOGIN_SUCCESS:
      return ({
        isFetching: false,
        isLoggedIn: true,
        expiry: action.response.expiry,
        token: action.response.token,
      })

    case actionTypes.LOGIN_FAILURE:
      console.log(action.response)
      return (initState)

    case actionTypes.LOGOUT_REQUEST:
      return ({
        isFetching: true,
      })

    case actionTypes.LOGOUT_SUCCESS:
      return (initState)

    case actionTypes.LOGOUT_FAILURE:
      return ({
        isFetching: false,
      })

    default:
      return state;
  }
}

export default Account;
