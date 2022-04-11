import dayjs from 'dayjs';
import { Dispatch } from 'redux';
import { EventState } from '../../types/windows/event/event';
import { SelectElementsAction, SelectElementsActionTypes } from '../../types/selectElements';

export const selectModalWindow = (windowName: string) => {
  return (dispatch: Dispatch<SelectElementsAction>) => {
      dispatch({type: SelectElementsActionTypes.SELECT_MODAL_WINDOW, payload: windowName});
  }
}

export const selectModalPage = (page: string) => {
  return (dispatch: Dispatch<SelectElementsAction>) => {
      dispatch({type: SelectElementsActionTypes.SELECT_MODAL_PAGE, payload: page});
  }
}

export const selectDay = (day: dayjs.Dayjs) => {
  return (dispatch: Dispatch<SelectElementsAction>) => {
      dispatch({type: SelectElementsActionTypes.SELECT_DAY, payload: day});
  }
}

export const selectWeek = (week: dayjs.Dayjs[]) => {
  return (dispatch: Dispatch<SelectElementsAction>) => {
      dispatch({type: SelectElementsActionTypes.SELECT_WEEK, payload: week});
  }
}

export const selectHour = (hour: number) => {
  return (dispatch: Dispatch<SelectElementsAction>) => {
      dispatch({type: SelectElementsActionTypes.SELECT_HOUR, payload: hour});
  }
}

export const selectEvent = (event: EventState) => {
  return (dispatch: Dispatch<SelectElementsAction>) => {
      dispatch({type: SelectElementsActionTypes.SELECT_EVENT, payload: event});
  }
}