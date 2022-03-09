import dayjs from "dayjs";
import { EventState, EventAction, EventActionTypes } from "../../types/event";

const initialState: EventState = {
  title: '',
  beginTime: dayjs().format('YYYY-MM-DDTHH:mm'),
  endTime: dayjs().format('YYYY-MM-DDTHH:mm'),
  description: '',
  meetingLink: '',
  isRepeating: false,
}

export const eventReducer = (state = initialState, action: EventAction): EventState => {
  switch(action.type) {
    case EventActionTypes.SAVE_EVENT:
      return action.payload;
    default:
      return state;
  }
}