import React, {useState, useEffect} from 'react';
import GlobalContext from './globalContext';
import dayjs from 'dayjs';
import { getWeek } from '../utils/getWeek';

export default function ContextWrapper(props: any) {
  const [day, setDay] = useState(dayjs());
  const [week, setWeek] = useState(getWeek(dayjs()));
  const [daySelected, setDaySelected] = useState<dayjs.Dayjs>(dayjs());
  const [monthNavigateCalendar, setMonthNavigateCalendar] = useState(0);
  const [showModalWindow, setShowModalWindow] = useState(false);

  // useEffect(() => {
  //   if (navigateCalendarMonth !== 0) {
  //     setDay(navigateCalendarMonth);
  //   }
  // }, [navigateCalendarMonth])

  return (
    <GlobalContext.Provider value={{
      monthNavigateCalendar,
      setMonthNavigateCalendar,
      day, 
      setDay,
      week,
      setWeek,
      daySelected,
      setDaySelected,
      showModalWindow,
      setShowModalWindow,
      }}>
      {props.children}
    </GlobalContext.Provider>
  )
}
