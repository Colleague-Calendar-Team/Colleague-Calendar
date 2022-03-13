import { Dispatch } from 'redux';
import { EventState, EventAction, EventActionTypes } from '../../types/event';
import urls from '../../ajax/urls';
import ajax from '../../ajax/ajax';

export const saveEvent = (event: EventState) => {
  return (dispatch: Dispatch<EventAction>) => {
    try {
      console.log('EVENT:', event)
      dispatch({type: EventActionTypes.SAVE_EVENT, payload: event});

      const requestParams: RequestInit = {
        body: Object(event),
      }
      ajax.post(urls.eventAdd(), requestParams).then((response) => {
        console.log("EVENT response:");
        console.log(response);
      });
    }
    catch {
      console.log('ERROR in Save Event:', event)
    }
  }
}