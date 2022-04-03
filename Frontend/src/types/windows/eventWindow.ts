import { EventState } from "../event";

export interface GeneralEventInfoState {
  isCreate: boolean;
  event: EventState;
  setEvent: (event: EventState) => void;
  selectModalPage: (page: string) => void;
}