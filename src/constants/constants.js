export const API_URL =  'http://'+window.location.hostname+':3000/api'
export const LOGIN_URL = API_URL + '/Clients/login'
export const LOGOUT_URL = (token) => API_URL + '/Clients/logout?access_token='+token
//export const REGISTER_URL = API_URL + '/Clients/register'
export const REGISTER_URL = API_URL + '/Clients'