import dayjs from 'dayjs';
import { EventState, EventInit } from '../../types/windows/event/event';
import { getWeek } from '../../utils/getWeek';
import { SelectElementsState, SelectElementsActionTypes, SelectElementsAction } from './../../types/selectElements';

const initialState: SelectElementsState = {
  modalWindow: '',
  modalPage: '',
  selectedDay: dayjs(),
  selectedWeek: getWeek(dayjs()),
  selectedHour: -1,
  selectedEvent: EventInit({}),
}

export const selectElementsReducer = (state = initialState, action: SelectElementsAction): SelectElementsState => {
  switch(action.type) {
    case SelectElementsActionTypes.SELECT_MODAL_WINDOW:
      return {...state, modalWindow: action.payload};
    case SelectElementsActionTypes.SELECT_MODAL_PAGE:
      return {...state, modalPage: action.payload};
    case SelectElementsActionTypes.SELECT_DAY:
      return {...state, selectedDay: action.payload};
    case SelectElementsActionTypes.SELECT_WEEK:
      return {...state, selectedWeek: action.payload};
    case SelectElementsActionTypes.SELECT_HOUR:
      return {...state, selectedHour: action.payload};
    case SelectElementsActionTypes.SELECT_EVENT:
      return {...state, selectedEvent: action.payload};
    default:
      return state;
  }
}