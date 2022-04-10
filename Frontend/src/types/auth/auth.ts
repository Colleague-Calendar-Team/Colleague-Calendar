import { LoginState } from "./login";
import { RegistrationState } from "./registration";

export interface AuthState {
  login: LoginState;
  registration: RegistrationState;
}

export enum AuthActionTypes {
  REGISTER_SUCCESS = "REGISTER_SUCCESS",
  REGISTER_ERROR = "REGISTER_ERROR",
  REGISTER_END = "REGISTER_END",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGOUT_SUCCESS = "LOGOUT_SUCCESS",
  AUTH_ERROR = "AUTH_ERROR",
}

interface RegistrationSuccessAction {
  type: AuthActionTypes.REGISTER_SUCCESS;
}

interface RegistrationEndAction {
  type: AuthActionTypes.REGISTER_END;
}

interface RegistrationErrorAction {
  type: AuthActionTypes.REGISTER_ERROR;
  payload: string;
}

interface LoginSuccessAction {
  type: AuthActionTypes.LOGIN_SUCCESS;
  payload: string;
}

interface AuthErrorAction {
  type: AuthActionTypes.AUTH_ERROR;
  payload: string;
}

interface LogoutSuccessAction {
  type: AuthActionTypes.LOGOUT_SUCCESS;
}


export type AuthAction = RegistrationSuccessAction | RegistrationErrorAction | RegistrationEndAction | LoginSuccessAction | AuthErrorAction | LogoutSuccessAction;