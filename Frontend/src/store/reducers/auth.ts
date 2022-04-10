import { AuthActionTypes, AuthAction, AuthState } from "../../types/auth/auth";

const initialState: AuthState = {
  registration: {
    isRegistered: false,
    error: null,
  },
  login: {
    token: '',
    error: null,
  }
}

export const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch(action.type) {
    case AuthActionTypes.REGISTER_SUCCESS:
      return { ...state, registration: {isRegistered: true, error: null},};
    case AuthActionTypes.REGISTER_ERROR:
      return { ...state, registration: {isRegistered: false, error: action.payload},};
    case AuthActionTypes.REGISTER_END:
      return { ...state, registration: {isRegistered: false, error: null},};
    case AuthActionTypes.LOGIN_SUCCESS:
      return { ...state, login: {token: action.payload, error: null},};
    case AuthActionTypes.AUTH_ERROR:
      return { ...state, login: {token: state.login.token, error: action.payload},};
    case AuthActionTypes.LOGOUT_SUCCESS:
      return { ...state, login: {token: '', error: null},};
    default:
      return state;
  }
}