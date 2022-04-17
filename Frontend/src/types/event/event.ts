export interface EventState {
  eventID: number;
  title: string;
  beginTime: string;
  endTime: string;
  description: string;
  meetingLink: string;
  isRepeating: boolean;
  owner: string;
  notificationTime: number;
  notificationInTelegram: boolean;
  notificationInEmail: boolean;
  notificationInSMS: boolean;
  participiants: number[];
}

export enum EventActionTypes {
  SAVE_EVENT = "SAVE_EVENT",
}

interface SaveEventAction {
  type: EventActionTypes.SAVE_EVENT;
  payload: EventState;
}

export type EventAction = SaveEventAction;

export interface EventCreationState {
  title: string;
  beginTime: string;
  endTime: string;
  description: string;
  meetingLink: string;
  isRepeating: boolean;
  notificationTime: number;
  notificationInTelegram: boolean;
  notificationInEmail: boolean;
  notificationInSMS: boolean;
  participiants: number[];
}
