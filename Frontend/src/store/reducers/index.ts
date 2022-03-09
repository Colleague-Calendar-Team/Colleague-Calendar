import { eventReducer } from './eventReducer';
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  events: eventReducer,
})

export type RootState = ReturnType<typeof rootReducer>;