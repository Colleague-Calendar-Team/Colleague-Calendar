import { eventsReducer } from './eventsReducer';
import { userReducer } from './userReducer';
import { selectElementsReducer } from './selectElementsReducer';
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  events: eventsReducer,
  user: userReducer,
  selectElements: selectElementsReducer,
})

export type RootState = ReturnType<typeof rootReducer>;