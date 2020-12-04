export const ROOT =
  process.env.NODE_ENV === 'production'
    ? 'https://wss-sharif.ir/api/'
    : 'https://localhost/api/';



export const REGISTER = ROOT.concat('register/')
export const LOGIN = ROOT.concat('login/')
export const LOGOUT = ROOT.concat('logout/')