import { EventState } from "../event/event";
import { UserProfileState } from "../user";
import { NotificationsState } from "../event/notifications";

export interface GeneralEventInfoState {
  isCreate: boolean;
  event: EventState;
  setEvent: (event: EventState) => void;
  selectModalPage: (page: string) => void;
}

export interface MembersEventInfoState {
  isCreate: boolean;
  users: UserProfileState[];
  setUsers: (users: UserProfileState[]) => void;
  checked: Set<number>;
  setChecked: (checked: Set<number>) => void;
  date: string;
}

export interface NotificationsEventInfoState {
  isCreate: boolean;
  notifications: NotificationsState;
  setNotifications: (notifications: NotificationsState) => void;
  onCreate: () => void;
}