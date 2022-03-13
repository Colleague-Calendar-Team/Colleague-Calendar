import dayjs from "dayjs";
import { EventState } from "./event";

export interface EventElementState {
  event: EventState;
  day: dayjs.Dayjs;
  hour: number;
  eventId: number;
}