export interface UserState {
  userID: number;
  password: string;
  email: string;
  phoneNumber: string;
  telegramID: string;
  name: string;
  surname: string;
  avatarUrl: string | null;
}

export interface UserProfileState {
  userID: number;
  name: string;
  surname: string;
}

export interface UserInfoState {
  email: string;
  phoneNumber: string;
  telegramID: string;
  name: string;
  surname: string;
}

export interface PasswordInfoState {
  oldPassword: string;
  newPassword: string;
  newPasswordRepeat: string;
}

export enum UserActionTypes {
  LOAD_USER = "LOAD_USER",
  UPDATE_AVATAR = "UPDATE_AVATAR",
  UPDATE_PROFILE = "UPDATE_PROFILE",
  UPDATE_PASSWORD = "UPDATE_PASSWORD",
}

interface LoadUserAction {
  type: UserActionTypes.LOAD_USER;
  payload: UserState;
}

interface UpdateProfileAction {
  type: UserActionTypes.UPDATE_PROFILE;
  payload: UserInfoState;
}

interface UpdatePasswordAction {
  type: UserActionTypes.UPDATE_PASSWORD;
  payload: PasswordInfoState;
}

interface UpdateAvatarAction {
  type: UserActionTypes.UPDATE_AVATAR;
  payload: string;
}

export type UserAction = LoadUserAction | UpdateAvatarAction | UpdatePasswordAction | UpdateProfileAction;