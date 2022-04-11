import { EventState } from "./event";

export interface EventsState {
  events: EventState[][] | null;
  renderWeek: number;
  loading: boolean;
  error: string | null;
}

export enum EventsActionTypes {
  LOADING_EVENTS = "LOADING_EVENTS",
  LOADING_EVENTS_SUCCESS = "LOADING_EVENTS_SUCCESS",
  LOADING_EVENTS_ERROR = "LOADING_EVENTS_ERROR",
  CHANGE_WEEK = "CHANGE_WEEK",
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

export type EventsAction = LoadingEventsAction | LoadingEventsSuccessAction | LoadingEventsErrorAction | ChangeWeekAction;