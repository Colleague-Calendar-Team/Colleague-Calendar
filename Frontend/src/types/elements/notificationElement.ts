import { NotificationsState } from "../event/notifications";

export interface NotificationElementState {
  ntfName: string;
  ntfLabel: string;
  notification: boolean;
  setNotification: () => void;
  children: React.ReactNode;
}