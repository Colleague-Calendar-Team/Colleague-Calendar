import { EventsState, EventsActionTypes, EventsAction } from "../../types/events";

const initialState: EventsState = {
  events: null,
  renderWeek: 0,
  loading: true,
  error: null,
}

export const eventsReducer = (state = initialState, action: EventsAction): EventsState => {
  switch(action.type) {
    case EventsActionTypes.LOADING_EVENTS:
      return {...state, loading: true};
    case EventsActionTypes.LOADING_EVENTS_SUCCESS:
      return {...state, events: action.payload, loading: false};
    case EventsActionTypes.LOADING_EVENTS_ERROR:
      return {...state, error: action.payload, loading: false};
    case EventsActionTypes.CHANGE_WEEK:
      return {...state, renderWeek: action.payload};
    default:
      return state;
  }
}