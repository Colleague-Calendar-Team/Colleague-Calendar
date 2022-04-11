import { EventCreationState, EventState } from "./event";

export interface EventsState {
  events: EventState[][];
  renderWeek: number;
  loading: boolean;
  error: string | null;
}

export enum EventsActionTypes {
  LOADING_EVENTS = "LOADING_EVENTS",
  LOADING_EVENTS_SUCCESS = "LOADING_EVENTS_SUCCESS",
  LOADING_EVENTS_ERROR = "LOADING_EVENTS_ERROR",
  CHANGE_WEEK = "CHANGE_WEEK",
  ADD_EVENT = "ADD_EVENT",
}

interface LoadingEventsAction {
  type: EventsActionTypes.LOADING_EVENTS;
}

interface LoadingEventsSuccessAction {
  type: EventsActionTypes.LOADING_EVENTS_SUCCESS;
  payload: EventState[][];
}

interface LoadingEventsErrorAction {
  type: EventsActionTypes.LOADING_EVENTS_ERROR;
  payload: string;
}

interface ChangeWeekAction {
  type: EventsActionTypes.CHANGE_WEEK;
  payload: number;
}

interface AddEventAction {
  type: EventsActionTypes.ADD_EVENT;
  payload: EventState;
}

export type EventsAction = LoadingEventsAction | LoadingEventsSuccessAction | LoadingEventsErrorAction | ChangeWeekAction | AddEventAction;