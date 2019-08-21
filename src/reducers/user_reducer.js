import { SET_LOGIN_PENDING, SET_LOGIN_SUCCESS, SET_LOGIN_ERROR, SUCCESSFUL_LOGIN, SUCCESSFUL_LOGOUT, SUCCESSFUL_REGISTRATION} from "../actions/login_actions";

const initialState = {
    isLoginSuccess: localStorage.getItem('TOKEN') ? true : false,
    isUserInfoSuccess: false,
    isLoginPending: false,
    isRetrievingUserInfo: false,
    loginError: null,
    userInfoError: null,
    token: localStorage.getItem('TOKEN'),
    userId: localStorage.getItem('USERID'),
  }

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOGIN_PENDING:
      return Object.assign({}, state, {
        isLoginPending: action.isLoginPending,
        loginError: null,
      });

    case SET_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isLoginSuccess: action.isLoginSuccess
      });

    case SUCCESSFUL_LOGIN:
      //console.log(action.payload);
      return Object.assign({}, state, {
        isLoginSuccess: true,
        token: action.payload.id,
        userId: action.payload.userId
    });


    default:
      return state;
  }
}