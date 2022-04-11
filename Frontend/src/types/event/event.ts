import dayjs from "dayjs";

export interface EventState {
  eventID: number;
  title: string;
  beginTime: string;
  endTime: string;
  description: string;
  meetingLink: string;
  isRepeating: boolean;
  owner: string;
  notificationTime:	number;
  notificationInTelegram:	boolean;
  notificationInEmail: boolean;
  notificationInSMS: boolean;
}

export enum EventActionTypes {
  SAVE_EVENT = "SAVE_EVENT",
}

interface SaveEventAction {
  type: EventActionTypes.SAVE_EVENT;
  payload: EventState;
}

export type EventAction = SaveEventAction;

export function EventInit({eventID = -1, title = '', description = '', beginTime = dayjs().format('YYYY-MM-DDTHH:mm'), endTime = dayjs().format('YYYY-MM-DDTHH:mm'), meetingLink = '', isRepeating = false, owner = ''}): EventState {
  return {
    eventID: eventID,
    title: title,
    beginTime: beginTime,
    endTime: endTime,
    description: description,
    meetingLink: meetingLink,
    isRepeating: isRepeating,
    owner: owner,
    notificationTime:	5,
    notificationInTelegram:	false,
    notificationInEmail: false,
    notificationInSMS: false,
  }
}