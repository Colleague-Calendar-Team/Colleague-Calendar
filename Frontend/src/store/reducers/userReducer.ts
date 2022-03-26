import { UserState, UserAction, UserActionTypes } from "../../types/user";

const initialState: UserState = {
  password: '',
  email: 'unknown@mail.ru',
  phoneNumber: '',
  telegramID: '',
  name: 'unknown',
  surname: 'unknown',
  avatarUrl: null,
  isAuthenticated: true,
}

export const userReducer = (state = initialState, action: UserAction): UserState => {
  switch(action.type) {
    case UserActionTypes.LOAD_USER:
      return action.payload;
    case UserActionTypes.SAVE_AVATAR:
      return {...state, avatarUrl: action.payload};
    case UserActionTypes.AUTH_USER:
      return {...state, isAuthenticated: action.payload};
    default:
      return state;
  }
}