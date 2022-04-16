import { EventState } from "../../types/event/event";
import { EventsState, EventsActionTypes, EventsAction } from "../../types/event/events";

const initialState: EventsState = {
  events: [],
  renderWeek: 2,
  loading: false,
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
    case EventsActionTypes.ADD_EVENT:
      return {...state, events: state.events.map((_, id) => {
        if (id === state.renderWeek) {
          return state.events[id].concat(action.payload);
        } else {
          return state.events[id];
        }
      })};
    default:
      return state;
  }
}