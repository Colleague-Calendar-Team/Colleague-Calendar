export interface NotificationElementState {
  ntfName: string;
  ntfLabel: string;
  selectedNotifications: string[];
  setSelectedNotifications: React.Dispatch<React.SetStateAction<string[]>>;
  children: React.ReactNode;
}