import dayjs from "dayjs";
import { EventState } from "../../types/event/event";
import { EventsState, EventsActionTypes, EventsAction } from "../../types/event/events";
import { getFirstDayForToday } from "../../utils/getWeek";

const initialState: EventsState = {
  events: [],
  renderWeek: 2,
  firstDate: getFirstDayForToday(dayjs()),
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
    case EventsActionTypes.CHANGE_FIRST_DATE:
      return {...state, firstDate: action.payload};
    case EventsActionTypes.ADD_EVENT:
      return {...state, events: state.events.map((_, weekId) => {
        if (weekId === state.renderWeek) {
          return state.events[weekId].concat(action.payload);
        } else {
          return state.events[weekId];
        }
      })};
    case EventsActionTypes.UPDATE_EVENT:
      return {...state, events: state.events.map((_, weekId) => {
        if (weekId === state.renderWeek) {
          return state.events[weekId].map((event) => {
            if (event.eventID === action.id) {
              return { ...event, title: action.payload.title, beginTime: action.payload.beginTime, endTime: action.payload.endTime, 
                description: action.payload.description, meetingLink: action.payload.meetingLink, isRepeating: action.payload.isRepeating};
            } else {
              return event;
            }
          });
        } else {
          return state.events[weekId];
        }
      })};
    case EventsActionTypes.UPDATE_PARTICIPANTS:
      return {...state, events: state.events.map((_, weekId) => {
        if (weekId === state.renderWeek) {
          return state.events[weekId].map((event) => {
            if (event.eventID === action.id) {
              return { ...event, participiants: action.payload};
            } else {
              return event;
            }
          });
        } else {
          return state.events[weekId];
        }
      })};
    case EventsActionTypes.UPDATE_NOTIFICATIONS:
      return {...state, events: state.events.map((_, weekId) => {
        if (weekId === state.renderWeek) {
          return state.events[weekId].map((event) => {
            if (event.eventID === action.id) {
              return { ...event, 
                notificationTime: action.payload.notificationTime,
                notificationInTelegram: action.payload.notificationInTelegram,
                notificationInEmail: action.payload.notificationInEmail,
                notificationInSMS: action.payload.notificationInSMS};
            } else {
              return event;
            }
          });
        } else {
          return state.events[weekId];
        }
      })};
    default:
      return state;
  }
}