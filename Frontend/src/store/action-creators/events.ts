import { Dispatch } from 'redux';
import { EventsState, EventsAction, EventsActionTypes } from '../../types/events';
import urls from '../../ajax/urls';
import ajax from '../../ajax/ajax';

export const loadEvents = () => {
  return (dispatch: Dispatch<EventsAction>) => {
    try {
      dispatch({type: EventsActionTypes.LOADING_EVENTS});

      ajax.get(urls.getWeeks()).then((response) => {
        console.log("EVENTS GET response:");
        console.log(response.data);
        dispatch({type: EventsActionTypes.LOADING_EVENTS_SUCCESS, payload: response.data});
      });
    }
    catch (e) {
      console.error('ERROR in LoadingEvents');
      dispatch({type: EventsActionTypes.LOADING_EVENTS_ERROR, payload: `Ошибка загрузки событий: ${e}`});
    }
  }
}

export const changeWeek = (week: number) => {
  return (dispatch: Dispatch<EventsAction>) => {
      dispatch({type: EventsActionTypes.CHANGE_WEEK, payload: week});
  }
}