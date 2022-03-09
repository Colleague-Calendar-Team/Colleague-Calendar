import { Dispatch } from 'redux';
import { EventState, EventAction, EventActionTypes } from '../../types/event';
import urls from './urls';

export const saveEvent = (event: EventState) => {
  return async (dispatch: Dispatch<EventAction>) => {
    try {
      console.log('EVENT:', event)
      dispatch({type: EventActionTypes.SAVE_EVENT, payload: event});
      fetch(urls.url, {
        method: 'POST',
      }).then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log('Save event:', response)
        return {response};
      })
    } catch {
      console.log('Error of saving event');
    }
  }
}