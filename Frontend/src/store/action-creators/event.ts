import { Dispatch } from 'redux';
import { EventsAction, EventsActionTypes } from '../../types/event/events';
import { EventCreationState } from '../../types/event/event';
import urls from '../../ajax/urls';
import ajax from '../../ajax/ajax';
import { RequestHeadersState, RequestParamsState } from '../../types/ajax';
import { DEBUG_REQUESTS, DEBUG_REQUESTS_ERRORS} from '../../utils/debug';
import { EventUpdateState } from '../../types/event/eventGeneral';
import { NotificationsState } from '../../types/event/notifications';
import dayjs from 'dayjs';

export const addEvent = (token: string, event: EventCreationState, owner: string) => {
  return (dispatch: Dispatch<EventsAction>) => {
    if (DEBUG_REQUESTS) {
      console.log('REQUEST add event:', ' owner: ', owner, "event:");
      console.log(event);
    }

    const requestParams: RequestParamsState = {
      body: Object(event),
      headers: new Headers ({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      }) as RequestHeadersState,
    }
    

    ajax.post(urls.addEvent(), requestParams).then((response) => {
      if (DEBUG_REQUESTS) {
        console.log("EVENT response:");
        console.log(response);
      }
      
      
      if (response.status === 200) {
        dispatch({type: EventsActionTypes.ADD_EVENT, payload: Object.assign(event, { eventID: response.data, owner: owner})});
      } else {
        throw response.data;
      }   
    }).catch ((e) => {
      if (DEBUG_REQUESTS_ERRORS) {
        console.error('ERROR in add event:', e);
      }
    });
  }
}

export const updateEvent = (token: string, event: EventUpdateState, eventID: number) => {
  return (dispatch: Dispatch<EventsAction>) => {
    if (DEBUG_REQUESTS) {
      console.log('REQUEST update event general info:');
      console.log(event);
    }

    const requestParams: RequestParamsState = {
      body: Object(event),
      headers: new Headers ({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      }) as RequestHeadersState,
    }
    
    ajax.patch(urls.updateEvent(eventID), requestParams).then((response) => {
      if (DEBUG_REQUESTS) {
        console.log("EVENT update response:");
        console.log(response);
      }
      
      if (response.status === 200) {
        dispatch({type: EventsActionTypes.UPDATE_EVENT, payload: event, id: eventID});
      } else {
        throw response.data;
      }   
    }).catch ((e) => {
      if (DEBUG_REQUESTS_ERRORS) {
        console.error('ERROR in update event general info:', e);
      }
    });
  }
}

export const updateParticipants = (token: string, participiants: number[], eventID: number) => {
  return (dispatch: Dispatch<EventsAction>) => {
    if (DEBUG_REQUESTS) {
      console.log('REQUEST update event participiants:');
      console.log(participiants);
    }

    const requestParams: RequestParamsState = {
      body: Object(participiants),
      headers: new Headers ({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      }) as RequestHeadersState,
    }
    
    ajax.patch(urls.updateEventParticipiants(eventID), requestParams).then((response) => {
      if (DEBUG_REQUESTS) {
        console.log("EVENT update participiants response:");
        console.log(response);
      }
      
      if (response.status === 200) {
        dispatch({type: EventsActionTypes.UPDATE_PARTICIPANTS, payload: participiants, id: eventID});
      } else {
        throw response.data;
      }   
    }).catch ((e) => {
      if (DEBUG_REQUESTS_ERRORS) {
        console.error('ERROR in update participiants:', e);
      }
    });
  }
}

export const updateNotifications = (token: string, notifications: NotificationsState, eventID: number) => {
  return (dispatch: Dispatch<EventsAction>) => {
    if (DEBUG_REQUESTS) {
      console.log('REQUEST update event notifications:');
      console.log(notifications);
    }

    const requestParams: RequestParamsState = {
      body: Object(notifications),
      headers: new Headers ({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      }) as RequestHeadersState,
    }
    
    ajax.patch(urls.updateEventNotifications(eventID), requestParams).then((response) => {
      if (DEBUG_REQUESTS) {
        console.log("EVENT update notifications response:");
        console.log(response);
      }
      
      if (response.status === 200) {
        dispatch({type: EventsActionTypes.UPDATE_NOTIFICATIONS, payload: notifications, id: eventID});
      } else {
        throw response.data;
      }   
    }).catch ((e) => {
      if (DEBUG_REQUESTS_ERRORS) {
        console.error('ERROR in update notifications:', e);
      }
    });
  }
}

export const getProfilesByUsername = (username: string) => {
  try {
    if (DEBUG_REQUESTS) {
      console.log('REQUEST get profiles by username: ', username);
    }

    return ajax.get(urls.getUsersProfiles(username));
  }
  catch {
    if (DEBUG_REQUESTS_ERRORS) {
      console.error('ERROR in get profiles by username:', username);
    }
  }
}

export const getUserWorkload = (date: dayjs.Dayjs, userID: number, token: string) => {
  try {
    if (DEBUG_REQUESTS) {
      console.log('REQUEST: ', urls.getUserWorkload(userID));
    }

    const requestParams: RequestParamsState = {
      headers: new Headers ({
        'Authorization': 'Bearer ' + token,
        'x-date' : date.format('YYYY-MM-DD'),
      }) as RequestHeadersState,
    }

    return ajax.get(urls.getUserWorkload(userID), requestParams);
  }
  catch {
    if (DEBUG_REQUESTS_ERRORS) {
      console.error('ERROR in Get User Workload: user:', userID, " date: ", date);
    }
  }
}