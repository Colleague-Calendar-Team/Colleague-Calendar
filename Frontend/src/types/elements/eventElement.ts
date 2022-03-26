import dayjs from "dayjs";
import { EventState } from "../event";

export interface EventElementState {
  event: EventState;
  day: dayjs.Dayjs;
  hour: number;
  eventId: number;
  setShowModalWindow: (open: string) => void,
  setSelectedEvent: (event: EventState) => void,
  selectHour: (hour: number) => void;
}