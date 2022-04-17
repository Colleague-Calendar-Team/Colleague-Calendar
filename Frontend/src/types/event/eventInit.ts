import dayjs from "dayjs";
import { EventState } from "./event";

export function EventInit({
  eventID = -1,
  title = "",
  description = "",
  beginTime = dayjs().format("YYYY-MM-DDTHH:mm"),
  endTime = dayjs().format("YYYY-MM-DDTHH:mm"),
  meetingLink = "",
  isRepeating = false,
  notificationTime = 5,
  notificationInTelegram = false,
  notificationInEmail = false,
  notificationInSMS = false,
  owner = "",
  participiants = [],
}): EventState {
  return {
    eventID: eventID,
    title: title,
    beginTime: beginTime,
    endTime: endTime,
    description: description,
    meetingLink: meetingLink,
    isRepeating: isRepeating,
    owner: owner,
    notificationTime: notificationTime,
    notificationInTelegram: notificationInTelegram,
    notificationInEmail: notificationInEmail,
    notificationInSMS: notificationInSMS,
    participiants: participiants,
  };
}