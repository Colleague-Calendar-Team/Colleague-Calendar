export interface NotificationItemState {
  ntfName: string;
  ntfLabel: string;
  selectedNotifications: string[];
  setSelectedNotifications: React.Dispatch<React.SetStateAction<string[]>>;
  children: React.ReactNode;
}