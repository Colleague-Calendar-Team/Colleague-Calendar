import { EventState } from "../event";
import { MemberState } from "../members";

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