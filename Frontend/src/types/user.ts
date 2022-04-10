export interface UserState {
  userID: number;
  password: string;
  email: string;
  phoneNumber: string;
  telegramID: string;
  name: string;
  surname: string;
  avatarUrl: string | null;
  token: string;
}

export interface UserProfileState {
  userID: number;
  name: string;
  surname: string;
}

export enum UserActionTypes {
  LOAD_USER = "LOAD_USER",
  CHANGE_USER = "CHANGE_USER",
  SAVE_AVATAR = "SAVE_AVATAR",
  AUTH_USER = "AUTH_USER",
}

interface LoadUserAction {
  type: UserActionTypes.LOAD_USER;
  payload: UserState;
}

interface ChangeUserAction {
  type: UserActionTypes.CHANGE_USER;
  payload: UserState;
}

interface SaveAvatarAction {
  type: UserActionTypes.SAVE_AVATAR;
  payload: string;
}

interface AuthUserAction {
  type: UserActionTypes.AUTH_USER;
  payload: string;
}

export type UserAction = LoadUserAction | ChangeUserAction | SaveAvatarAction | AuthUserAction;