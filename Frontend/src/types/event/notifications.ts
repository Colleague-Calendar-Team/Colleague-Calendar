export interface NotificationsState {
  notificationTime:	number;
  notificationInTelegram: boolean;
  notificationInEmail: boolean;
  notificationInSMS: boolean;
}

export const NotificationsInit = {
  notificationTime:	5,
  notificationInTelegram: false,
  notificationInEmail: true,
  notificationInSMS: false,
}