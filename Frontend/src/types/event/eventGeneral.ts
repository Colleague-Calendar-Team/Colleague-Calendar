import dayjs from "dayjs";

export interface EventUpdateState {
  title: string;
  beginTime: string;
  endTime: string;
  description: string;
  meetingLink: string;
  isRepeating: boolean;
}

export function EventUpdateInit({
  title = "",
  description = "",
  beginTime = dayjs().format("YYYY-MM-DDTHH:mm"),
  endTime = dayjs().format("YYYY-MM-DDTHH:mm"),
  meetingLink = "",
  isRepeating = false,
}): EventUpdateState {
  return {
    title: title,
    beginTime: beginTime,
    endTime: endTime,
    description: description,
    meetingLink: meetingLink,
    isRepeating: isRepeating,
  };
}