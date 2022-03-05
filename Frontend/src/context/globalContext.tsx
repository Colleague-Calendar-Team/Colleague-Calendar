import React from 'react';
import dayjs from 'dayjs';

const GlobalContext = React.createContext({
  day: dayjs(),
  setDay: (day: dayjs.Dayjs) => {},
  navigateCalendarMonth: 0,
  setNavigateCalendarMonth: (id: number) => {},
  daySelected: dayjs(),
  setDaySelected: (day: dayjs.Dayjs) => {},
  showModalWindow: false,
  setShowModalWindow: (open: boolean) => {},
})

export default GlobalContext;