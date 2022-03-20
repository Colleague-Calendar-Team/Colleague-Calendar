import React, {useState, useEffect} from 'react';
import GlobalContext from './globalContext';
import dayjs from 'dayjs';
import { getWeek } from '../utils/getWeek';

export default function ContextWrapper(props: any) {
  const [week, setWeek] = useState(getWeek(dayjs()));
  const [daySelected, setDaySelected] = useState<dayjs.Dayjs>(dayjs());
  const [showModalWindow, setShowModalWindow] = useState<string>('');
  const [modalPage, setModalPage] = useState('');

  return (
    <GlobalContext.Provider value={{
      week,
      setWeek,
      daySelected,
      setDaySelected,
      showModalWindow,
      setShowModalWindow,
      modalPage,
      setModalPage,
      }}>
      {props.children}
    </GlobalContext.Provider>
  )
}
