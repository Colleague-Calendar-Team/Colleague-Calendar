import { EventsState, EventsActionTypes, EventsAction } from "../../types/events";

const initialState: EventsState = {
  events: null,
  loading: true,
  error: null,
}

export const eventsReducer = (state = initialState, action: EventsAction): EventsState => {
  switch(action.type) {
    case EventsActionTypes.LOADING_EVENTS:
      return {events: null, loading: true, error: null};
    case EventsActionTypes.LOADING_EVENTS_SUCCESS:
      return {events: action.payload, loading: false, error: null};
    case EventsActionTypes.LOADING_EVENTS_ERROR:
      return {events: null, loading: false, error: action.payload};
    default:
      return state;
  }
}