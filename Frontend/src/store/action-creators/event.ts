import { Dispatch } from 'redux';
import { EventState, EventAction, EventActionTypes } from '../../types/event';
import urls from '../../ajax/urls';
import ajax from '../../ajax/ajax';
import { RequestParamsState } from '../../types/ajax';

export const saveEvent = (event: EventState) => {
  return (dispatch: Dispatch<EventAction>) => {
    try {
      console.log('EVENT:', event)
      dispatch({type: EventActionTypes.SAVE_EVENT, payload: event});

      const requestParams: RequestParamsState = {
        body: Object(event),
      }
      ajax.post(urls.addEvent(), requestParams).then((response) => {
        console.log("EVENT response:");
        console.log(response);
      });
    }
    catch {
      console.error('ERROR in Save Event:', event)
    }
  }
}