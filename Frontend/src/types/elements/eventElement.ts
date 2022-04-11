import { EventState } from "../event/event";

export interface EventElementState {
  event: EventState;
  eventId: number;
  setShowModalWindow: (open: string) => void,
  setSelectedEvent: (event: EventState) => void,
  selectHour: (hour: number) => void;
}