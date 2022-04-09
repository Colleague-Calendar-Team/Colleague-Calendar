import dayjs from "dayjs";
import { UserProfileState } from "../user";

export interface UserElementState {
  user: UserProfileState;
  date: string;
  checked: Set<number>;
  setChecked: (checked: Set<number>) => void;
}