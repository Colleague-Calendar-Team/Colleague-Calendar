import React from 'react';
import dayjs from 'dayjs';
import { getWeek } from '../utils/getWeek';

const GlobalContext = React.createContext({
  week: getWeek(dayjs()),
  setWeek: (week: dayjs.Dayjs[]) => {},
  daySelected: dayjs(),
  setDaySelected: (day: dayjs.Dayjs) => {},
  showModalWindow: false,
  setShowModalWindow: (open: boolean) => {},
  modalPage: '',
  setModalPage: (page: string) => {},
})

export default GlobalContext;