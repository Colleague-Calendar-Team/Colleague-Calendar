import { eventsReducer } from './eventsReducer';
import { userReducer } from './userReducer';
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  events: eventsReducer,
  user: userReducer,
})

export type RootState = ReturnType<typeof rootReducer>;