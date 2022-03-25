import { EventState } from "./event";

export interface EventsState {
  events: EventState[][] | null;
  loading: boolean;
  error: string | null;
}

export enum EventsActionTypes {
  LOADING_EVENTS = "LOADING_EVENTS",
  LOADING_EVENTS_SUCCESS = "LOADING_EVENTS_SUCCESS",
  LOADING_EVENTS_ERROR = "LOADING_EVENTS_ERROR",
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

export type EventsAction = LoadingEventsAction | LoadingEventsSuccessAction | LoadingEventsErrorAction;