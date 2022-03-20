import { UserState, UserAction, UserActionTypes } from "../../types/user";

const initialState: UserState = {
  password: '',
  email: 'unknown@mail.ru',
  phoneNumber: '',
  telegramID: '',
  name: 'unknown',
  surname: 'unknown',
}

export const userReducer = (state = initialState, action: UserAction): UserState => {
  switch(action.type) {
    case UserActionTypes.LOAD_USER:
      return action.payload;
    default:
      return state;
  }
}