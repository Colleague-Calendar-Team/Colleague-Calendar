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