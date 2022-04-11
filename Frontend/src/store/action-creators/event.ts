import { Dispatch } from 'redux';
import { EventsAction, EventsActionTypes } from '../../types/event/events';
import { EventCreationState } from '../../types/event/event';
import urls from '../../ajax/urls';
import ajax from '../../ajax/ajax';
import { RequestHeadersState, RequestParamsState } from '../../types/ajax';
import { DEBUG_REQUESTS, DEBUG_REQUESTS_ERRORS} from '../../utils/debug';

export const addEvent = (token: string, event: EventCreationState, owner: string) => {
  return (dispatch: Dispatch<EventsAction>) => {
    if (DEBUG_REQUESTS) {
      console.log('REQUEST add event:', ' owner: ', owner, "event:");
      console.log(event);
    }

    const requestParams: RequestParamsState = {
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