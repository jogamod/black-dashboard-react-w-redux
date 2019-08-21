import axios from 'axios'
import { LOGIN_URL, LOGOUT_URL } from '../constants/constants';

export const SET_LOGIN_PENDING = 'SET_LOGIN_PENDING';
export const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
export const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
export const SET_LOGOUT_ERROR = 'SET_LOGOUT_ERROR';
export const SUCCESSFUL_LOGIN = 'SUCCESSFUL_LOGIN';
export const SUCCESSFUL_LOGOUT = 'SUCCESSFUL_LOGOUT';

export const SUCCESSFUL_REGISTRATION = 'SUCCESSFUL_REGISTRATION';
export const FAILED_REGISTRATION = 'FAILED_REGISTRATION';


var qs = require('querystring');
export const TWO_WEEKS = 60*60*24


export function login(username, password) {
  return dispatch => {
    dispatch(setLoginPending(true));
    dispatch(setLoginSuccess(false));
    dispatch(setLoginError(null));

    callLoginApi(username, password, (response, error) => {
      dispatch(setLoginPending(false));
      if (!error) {
        console.log(response)
        localStorage.setItem('TOKEN', response.id);
        localStorage.setItem('USERID', response.userId);
        const currentTimestamp = Math.floor(Date.now() / 1000)
        localStorage.setItem('LOGIN_TIMESTAMP', currentTimestamp)
        dispatch(successfulLogin(response));
      } else {
        //console.log(error)
        dispatch(setLoginError(error));
      }
    });
  }
}



export function logout(isExpired) {
  return dispatch => {
    dispatch(setLoginPending(false));
    dispatch(setLoginSuccess(false));
    dispatch(setLoginError(null));
    if(isExpired){
      localStorage.removeItem('TOKEN');
      localStorage.removeItem('USERID');
      localStorage.removeItem('LOGIN_TIMESTAMP')
      dispatch(successfulLogout("Your session has ended, please login again."));
    }else{
      callLogoutApi(localStorage.getItem('TOKEN'),(response, error) => {
        if (!error) {
          console.log(response)
          localStorage.removeItem('TOKEN');
          localStorage.removeItem('USERID');
          localStorage.removeItem('LOGIN_TIMESTAMP')
          dispatch(successfulLogout(response));
        } else {
          //console.log(error)
          dispatch(setLogoutError(error));
        }
      })
    }



  }
}



export function setLoginPending(isLoginPending) {
  return {
    type: SET_LOGIN_PENDING,
    isLoginPending
  };
}

export function setLoginSuccess(isLoginSuccess) {
  return {
    type: SET_LOGIN_SUCCESS,
    isLoginSuccess
  };
}

export function successfulLogin(data) {
  return {
    type: SUCCESSFUL_LOGIN,
    payload: data
  }
}

export function successfulLogout(message) {
  return {
    type: SUCCESSFUL_LOGOUT,
    message
  }
}

export function setLoginError(loginError) {
  return {
    type: SET_LOGIN_ERROR,
    loginError
  }
}

export function setLogoutError(logoutError) {
  return {
    type: SET_LOGOUT_ERROR,
    logoutError
  }
}

export function registrationFailed(errorMsg){
  return {
    type: FAILED_REGISTRATION,
    errorMsg
  }
}

export function registrationSuccess(){
  return {
    type: SUCCESSFUL_REGISTRATION
  }
}


export function callLogoutApi(token, callback) {
  axios.post(LOGOUT_URL(token)
  ).then(response => {
    return callback(null, null);
  }).catch(error => {
    console.log(error);
    return callback(null, new Error('Invalid token provided'));
  })
}


export function callLoginApi(username, password, callback) {
  axios.post(LOGIN_URL, qs.stringify({
    username: username,
    password: password,
    grant_type: 'password',
    ttl: TWO_WEEKS
  }),
  {
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(function (response) {
    return callback(response.data, null);
  }).catch(function (error) {
    //console.log(error)
    return callback(null, new Error('Invalid username or password'));
  })
}