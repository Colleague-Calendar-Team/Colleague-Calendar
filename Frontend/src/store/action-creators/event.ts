import { Dispatch } from 'redux';
import { EventState, EventAction, EventActionTypes } from '../../types/event/event';
import urls from '../../ajax/urls';
import ajax from '../../ajax/ajax';
import { RequestParamsState } from '../../types/ajax';
import { DEBUG_REQUESTS, DEBUG_REQUESTS_ERRORS} from '../../utils/debug';

export const saveEvent = (event: EventState) => {
  return (dispatch: Dispatch<EventAction>) => {
    try {
      if (DEBUG_REQUESTS) {
        console.log('EVENT:', event)
      }
      
      dispatch({type: EventActionTypes.SAVE_EVENT, payload: event});

      const requestParams: RequestParamsState = {
        body: Object(event),
      }
      ajax.post(urls.addEvent(), requestParams).then((response) => {
        if (DEBUG_REQUESTS) {
          console.log("EVENT response:");
          console.log(response);
        }
      });
    }
    catch {
      if (DEBUG_REQUESTS_ERRORS) {
        console.error('ERROR in Save Event:', event)
      }
    }
  }
}