import { BASE_URL } from '../../constants/info'

export const ROOT =
  process.env.NODE_ENV === 'production'
    ? 'https://sharif-wss.ir/api/'
    : 'https://cors-anywhere.herokuapp.com/https://sharif-wss.ir/api/';

// export const ROOT = BASE_URL.concat('/api/')
export const REGISTER = ROOT.concat('register/');
export const LOGIN = ROOT.concat('login/');
export const LOGOUT = ROOT.concat('logout/');
export const CHANGE_PASSWORD = ROOT.concat('change-password/');
export const REQUEST_PASSWORD_RESET = ROOT.concat('password_reset/');
export const RESET_PASSWORD = ROOT.concat('password_reset/confirm/');



