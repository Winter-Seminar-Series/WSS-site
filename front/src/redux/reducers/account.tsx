import * as actionTypes from '../actionTypes';

const initState = {
  isFetching: false,
  isLoggedIn: false,
  id: '',
  username: '',
  email: '',
  token: '',
  expiry: '',
};

function Account(state = initState, action) {
  switch (action.type) {
    case actionTypes.REGISTER_REQUEST:
      return {
        isFetching: true,
        isLoggedIn: false,
      };

    case actionTypes.REGISTER_SUCCESS:
      return {
        id: action.response.user.id,
        username: action.response.user.username,
        email: action.response.user.email,
        token: action.response.token,
        isLoggedIn: true,
        isFetching: false,
      };

    case actionTypes.REGISTER_FAILURE:
      console.log(action.response);
      return {
        isFetching: false,
        isLoggedIn: false,
      };

    ///////////////////

    case actionTypes.LOGIN_REQUEST:
      return {
        isLoggedIn: false,
        isFetching: true,
      };

    case actionTypes.LOGIN_SUCCESS:
      return {
        isFetching: false,
        isLoggedIn: true,
        expiry: action.response.expiry,
        token: action.response.token,
      };

    case actionTypes.LOGIN_FAILURE:
      console.log(action.response);
      return {
        isLoggedIn: false,
        isFetching: false,
      };

    ///////////////////

    case actionTypes.LOGOUT_REQUEST:
      return {
        isFetching: true,
      };

    case actionTypes.LOGOUT_SUCCESS:
      return initState;

    case actionTypes.LOGOUT_FAILURE:
      return {
        isFetching: false,
      };

    ///////////////////

    case actionTypes.SEND_PAYMENT_SUCCESS:
      var link = document.createElement('a');
      link.href = action.response.redirect_url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return {
        ...state,
        redirect_url: action.response.redirect_url,
      };

    case actionTypes.VERIFY_PAYMENT_SUCCESS:
      console.log('hey');
      return {
        ...state,
        payment: {
          // url: action.response.message,
          // amount: action.response.amount,
          // typePayment: action.response.typePayment,
        },
      };

    case actionTypes.REMOVE_PAYMENT_DATA:
      return {
        ...state,
        payment: null,
      };

    default:
      return state;
  }
}

export default Account;
