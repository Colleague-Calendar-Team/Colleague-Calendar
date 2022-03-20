import { eventReducer } from './eventReducer';
import { userReducer } from './userReducer';
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  event: eventReducer,
  user: userReducer,
})

export type RootState = ReturnType<typeof rootReducer>;