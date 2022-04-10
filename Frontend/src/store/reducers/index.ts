import { eventsReducer } from './eventsReducer';
import { userReducer } from './userReducer';
import { selectElementsReducer } from './selectElementsReducer';
import { combineReducers } from "redux";
import { registrationReducer } from './registrationReducer';

export const rootReducer = combineReducers({
  events: eventsReducer,
  user: userReducer,
  selectElements: selectElementsReducer,
  registration: registrationReducer,
})

export type RootState = ReturnType<typeof rootReducer>;