import React from 'react';
import dayjs from 'dayjs';
import { getWeek } from '../utils/getWeek';

const GlobalContext = React.createContext({
  monthNavigateCalendar: 0,
  setMonthNavigateCalendar: (id: number) => {},
  day: dayjs(),
  setDay: (day: dayjs.Dayjs) => {},
  week: getWeek(dayjs()),
  setWeek: (week: dayjs.Dayjs[]) => {},
  daySelected: dayjs(),
  setDaySelected: (day: dayjs.Dayjs) => {},
  showModalWindow: false,
  setShowModalWindow: (open: boolean) => {},
})

export default GlobalContext;