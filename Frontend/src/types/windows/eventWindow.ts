import { EventUpdateState } from "../event/eventGeneral";
import { UserProfileState } from "../user";
import { NotificationsState } from "../event/notifications";

export interface GeneralEventInfoState {
  isCreate: boolean;
  eventID: number;
  event: EventUpdateState;
  setEvent: (event: EventUpdateState) => void;
  selectModalPage: (page: string) => void;
}

export interface MembersEventInfoState {
  isCreate: boolean;
  eventID: number;
  users: UserProfileState[];
  setUsers: (users: UserProfileState[]) => void;
  checked: Set<number>;
  setChecked: (checked: Set<number>) => void;
  date: string;
}

export interface NotificationsEventInfoState {
  isCreate: boolean;
  eventID: number;
  notifications: NotificationsState;
  setNotifications: (notifications: NotificationsState) => void;
  onCreate: () => void;
}