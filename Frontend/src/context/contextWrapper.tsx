import React, {useState, useEffect} from 'react';
import GlobalContext from './globalContext';
import dayjs from 'dayjs';

export default function ContextWrapper(props: any) {
  const [day, setDay] = useState(dayjs());
  const [navigateCalendarMonth, setNavigateCalendarMonth] = useState(0);
  const [daySelected, setDaySelected] = useState<dayjs.Dayjs>(dayjs());
  const [showModalWindow, setShowModalWindow] = useState(false);

  // useEffect(() => {
  //   if (navigateCalendarMonth !== 0) {
  //     setDay(navigateCalendarMonth);
  //   }
  // }, [navigateCalendarMonth])

  return (
    <GlobalContext.Provider value={{
      day, 
      setDay, 
      navigateCalendarMonth, 
      setNavigateCalendarMonth,
      daySelected,
      setDaySelected,
      showModalWindow,
      setShowModalWindow,
      }}>
      {props.children}
    </GlobalContext.Provider>
  )
}
