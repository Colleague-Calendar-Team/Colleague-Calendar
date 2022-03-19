import { eventReducer } from './eventReducer';
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  event: eventReducer,
})

export type RootState = ReturnType<typeof rootReducer>;