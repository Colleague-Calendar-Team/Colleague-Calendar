import dayjs from "dayjs";
import { EventState } from "../types/event";

export const EventInit: EventState = {
  title: '',
  beginTime: dayjs().format('YYYY-MM-DDTHH:mm'),
  endTime: dayjs().format('YYYY-MM-DDTHH:mm'),
  description: '',
  meetingLink: '',
  isRepeating: false,
}