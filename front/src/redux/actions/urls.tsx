export const ROOT =
  process.env.NODE_ENV === 'production'
    ? 'https://sharif-wss.ir/api/'
    : 'https://cors-anywhere.herokuapp.com/https://sharif-wss.ir/api/';
    
export const REGISTER = ROOT.concat('register/');
export const LOGIN = ROOT.concat('login/');
export const LOGOUT = ROOT.concat('logout/');
