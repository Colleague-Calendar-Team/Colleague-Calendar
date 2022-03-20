export interface UserState {
  password: string;
  email: string;
  phoneNumber: string;
  telegramID: string;
  name: string;
  surname: string;
}

export enum UserActionTypes {
  LOAD_USER = "LOAD_USER",
  CHANGE_USER = "CHANGE_USER",
}

interface LoadUserAction {
  type: UserActionTypes.LOAD_USER;
  payload: UserState;
}

interface ChangeUserAction {
  type: UserActionTypes.CHANGE_USER;
  payload: UserState;
}

export type UserAction = LoadUserAction | ChangeUserAction;