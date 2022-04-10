export interface RegistrationInfoState {
  name: string;
  surname: string;
  email: string;
  telegramID: string;
  password: string;
  repeatPassword: string;
  phoneNumber: string;
}

export interface RegistrationState {
  isRegistered: boolean;
  error: string | null;
}

export enum RegistrationActionTypes {
  REGISTER_SUCCESS = "REGISTER_SUCCESS",
  REGISTER_ERROR = "REGISTER_ERROR",
  REGISTER_END = "REGISTER_END",
}

interface RegistrationSuccessAction {
  type: RegistrationActionTypes.REGISTER_SUCCESS;
}

interface RegistrationEndAction {
  type: RegistrationActionTypes.REGISTER_END;
}

interface RegistrationErrorAction {
  type: RegistrationActionTypes.REGISTER_ERROR;
  payload: string;
}

export type RegistrationAction = RegistrationSuccessAction | RegistrationErrorAction | RegistrationEndAction;