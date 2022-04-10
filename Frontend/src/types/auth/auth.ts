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
  LOGIN_ERROR = "LOGIN_ERROR",
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

interface LoginErrorAction {
  type: AuthActionTypes.LOGIN_ERROR;
  payload: string;
}

export type AuthAction = RegistrationSuccessAction | RegistrationErrorAction | RegistrationEndAction | LoginSuccessAction | LoginErrorAction;