import { Dispatch } from 'redux';
import { EventsAction, EventsActionTypes } from '../../types/event/events';
import urls from '../../ajax/urls';
import ajax from '../../ajax/ajax';
import { RequestHeadersState, RequestParamsState } from '../../types/ajax';
import dayjs from 'dayjs';
import { DEBUG_REQUESTS, DEBUG_REQUESTS_ERRORS } from '../../utils/debug';

export const loadEvents = (token: string, date: dayjs.Dayjs) => {
  return (dispatch: Dispatch<EventsAction>) => {
    if (DEBUG_REQUESTS) {
      console.log("REQUEST load weeks events");
    }
      
    dispatch({type: EventsActionTypes.LOADING_EVENTS});

    const requestParams: RequestParamsState = {
      headers: new Headers ({
        'Authorization': 'Bearer ' + token,
        'x-date' : date.format('YYYY-MM-DD'),
        'Content-Type': 'application/json',
      }) as RequestHeadersState,
    }

    ajax.get(urls.getWeeks(), requestParams).then((response) => {
      if (DEBUG_REQUESTS) {
        console.log("EVENTS GET response:");
        console.log(response.data);
      }

      if (response.status === 200) {
        dispatch({type: EventsActionTypes.LOADING_EVENTS_SUCCESS, payload: response.data});
      } else {
        throw response.data;
      }   
    }).catch ((e) => {
      if (DEBUG_REQUESTS_ERRORS) {
        console.error('ERROR in LoadingEvents');
      }
     
      dispatch({type: EventsActionTypes.LOADING_EVENTS_ERROR, payload: `Ошибка загрузки событий: ${e}`});
    });
  }
}

export const changeWeek = (week: number) => {
  return (dispatch: Dispatch<EventsAction>) => {
      dispatch({type: EventsActionTypes.CHANGE_WEEK, payload: week});
  }
}

export const changeFirstDate = (newFirstDate: dayjs.Dayjs) => {
  return (dispatch: Dispatch<EventsAction>) => {
    dispatch({type: EventsActionTypes.CHANGE_FIRST_DATE, payload: newFirstDate});
  }
}