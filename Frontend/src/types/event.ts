import dayjs from "dayjs";

export interface EventState {
  title: string;
  beginTime: string;
  endTime: string;
  description: string;
  meetingLink: string;
  isRepeating: boolean;
}

export enum EventActionTypes {
  SAVE_EVENT = "SAVE_EVENT",
}

interface SaveEventAction {
  type: EventActionTypes.SAVE_EVENT;
  payload: EventState;
}

export type EventAction = SaveEventAction;

export function EventInit({title = '', description = '', beginTime = dayjs().format('YYYY-MM-DDTHH:mm'), endTime = dayjs().format('YYYY-MM-DDTHH:mm'), meetingLink = '', isRepeating = false}): EventState {
  return {
    title: title,
    beginTime: beginTime,
    endTime: endTime,
    description: description,
    meetingLink: meetingLink,
    isRepeating: isRepeating,
  }
}