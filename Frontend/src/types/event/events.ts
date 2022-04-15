import { UserProfileState } from "../user";
import { EventState } from "./event";
import { EventUpdateState } from "./eventGeneral";
import { NotificationsState } from "./notifications";

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
  UPDATE_EVENT = "UPDATE_EVENT",
  UPDATE_PARTICIPANTS = "UPDATE_PARTICIPANTS",
  UPDATE_NOTIFICATIONS = "UPDATE_NOTIFICATIONS",
  DELETE_EVENT = "DELETE_EVENT",
  GET_PARTICIPANTS = "GET_PARTICIPANTS",
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

interface UpdateEventAction {
  type: EventsActionTypes.UPDATE_EVENT;
  payload: EventUpdateState;
}

interface UpdateParticipiantsAction {
  type: EventsActionTypes.UPDATE_PARTICIPANTS;
  payload: number[];
}

interface UpdateNotificationsAction {
  type: EventsActionTypes.UPDATE_NOTIFICATIONS;
  payload: NotificationsState;
}

interface DeleteEventAction {
  type: EventsActionTypes.DELETE_EVENT;
}

interface GetParticipiantsAction {
  type: EventsActionTypes.GET_PARTICIPANTS;
  payload: UserProfileState[];
}

export type EventsAction = LoadingEventsAction | LoadingEventsSuccessAction | LoadingEventsErrorAction | ChangeWeekAction | AddEventAction
  | UpdateEventAction | UpdateParticipiantsAction | UpdateNotificationsAction | DeleteEventAction | GetParticipiantsAction;