import dayjs from "dayjs";
import { EventState } from "./event/event";

export interface SelectElementsState {
  modalWindow: string;
  modalPage: string;
  selectedDay: dayjs.Dayjs;
  selectedWeek: dayjs.Dayjs[];
  selectedHour: number;
  selectedEvent: EventState;
}

export enum SelectElementsActionTypes {
  SELECT_MODAL_WINDOW = "SELECT_MODAL_WINDOW",
  SELECT_MODAL_PAGE = "SELECT_MODAL_PAGE",
  SELECT_DAY = "SELECT_DAY",
  SELECT_EVENT = "SELECT_EVENT",
  SELECT_WEEK = "SELECT_WEEK",
  SELECT_HOUR = "SELECT_HOUR",
}

interface SelectModalWindowAction {
  type: SelectElementsActionTypes.SELECT_MODAL_WINDOW;
  payload: string;
}

interface SelectModalPageAction {
  type: SelectElementsActionTypes.SELECT_MODAL_PAGE;
  payload: string;
}

interface SelectDayAction {
  type: SelectElementsActionTypes.SELECT_DAY;
  payload: dayjs.Dayjs;
}

interface SelectWeekAction {
  type: SelectElementsActionTypes.SELECT_WEEK;
  payload: dayjs.Dayjs[];
}

interface SelectHourAction {
  type: SelectElementsActionTypes.SELECT_HOUR;
  payload: number;
}

interface SelectEventAction {
  type: SelectElementsActionTypes.SELECT_EVENT;
  payload: EventState;
}

export type SelectElementsAction = SelectModalWindowAction | SelectDayAction | SelectModalPageAction | SelectEventAction | SelectWeekAction | SelectHourAction;