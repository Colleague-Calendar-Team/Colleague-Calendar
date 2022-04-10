import { eventsReducer } from './eventsReducer';
import { userReducer } from './userReducer';
import { selectElementsReducer } from './selectElementsReducer';
import { combineReducers } from "redux";
import { authReducer } from './auth';

export const rootReducer = combineReducers({
  events: eventsReducer,
  user: userReducer,
  selectElements: selectElementsReducer,
  auth: authReducer,
})

export type RootState = ReturnType<typeof rootReducer>;