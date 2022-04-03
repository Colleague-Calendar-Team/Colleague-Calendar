import { EventState } from "../event";
import { MemberState } from "../members";
import { NotificationsState } from "../notifications";

export interface GeneralEventInfoState {
  isCreate: boolean;
  event: EventState;
  setEvent: (event: EventState) => void;
  selectModalPage: (page: string) => void;
}

export interface MembersEventInfoState {
  isCreate: boolean;
  users: MemberState[];
  setUsers: (users: MemberState[]) => void;
  checked: Set<number>;
  setChecked: (checked: Set<number>) => void;
}

export interface NotificationsEventInfoState {
  isCreate: boolean;
  notifications: NotificationsState;
  setNotifications: (notifications: NotificationsState) => void;
}