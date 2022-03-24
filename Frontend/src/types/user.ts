export interface UserState {
  password: string;
  email: string;
  phoneNumber: string;
  telegramID: string;
  name: string;
  surname: string;
  avatarUrl: string | null;
}

export enum UserActionTypes {
  LOAD_USER = "LOAD_USER",
  CHANGE_USER = "CHANGE_USER",
  SAVE_AVATAR = "SAVE_AVATAR",
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

export type UserAction = LoadUserAction | ChangeUserAction | SaveAvatarAction;