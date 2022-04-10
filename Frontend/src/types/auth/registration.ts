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