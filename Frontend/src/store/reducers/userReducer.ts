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
  switch(action.type) {
    case UserActionTypes.LOAD_USER:
      return action.payload;
    case UserActionTypes.SAVE_AVATAR:
      return {...state, avatarUrl: action.payload};
    default:
      return state;
  }
}