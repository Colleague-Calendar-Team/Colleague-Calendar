import { RegistrationActionTypes, RegistrationAction, RegistrationState } from "../../types/auth/registration";

const initialState: RegistrationState = {
  isRegistered: false,
  error: null,
}

export const registrationReducer = (state = initialState, action: RegistrationAction): RegistrationState => {
  switch(action.type) {
    case RegistrationActionTypes.REGISTER_SUCCESS:
      return {isRegistered: true, error: null};
    case RegistrationActionTypes.REGISTER_ERROR:
      return {isRegistered: false, error: action.payload};
    case RegistrationActionTypes.REGISTER_END:
      return {isRegistered: false, error: null};
    default:
      return state;
  }
}