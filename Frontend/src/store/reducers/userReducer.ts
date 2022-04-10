import { UserState, UserAction, UserActionTypes } from "../../types/user";

const initialState: UserState = {
  userID: 0,
  password: '',
  email: 'unknown@mail.ru',
  phoneNumber: '',
  telegramID: '',
  name: 'unknown',
  surname: 'unknown',
  avatarUrl: null,
}

export const userReducer = (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case UserActionTypes.LOAD_USER:
      return action.payload;
    case UserActionTypes.UPDATE_AVATAR:
      return { ...state, avatarUrl: action.payload };
    case UserActionTypes.UPDATE_PROFILE:
      return { ...state, email: action.payload.email, phoneNumber: action.payload.phoneNumber, 
        telegramID: action.payload.telegramID, name: action.payload.name, surname: action.payload.surname };
    case UserActionTypes.UPDATE_PASSWORD:
      return { ...state, password: action.payload.newPassword };
    default:
      return state;
  }
}