import React, {useState, useEffect} from 'react';
import GlobalContext from './globalContext';
import dayjs from 'dayjs';
import { getWeek } from '../utils/getWeek';
import { EventState } from '../types/event';
import { EventInit } from './initialState';

export default function ContextWrapper(props: any) {
  const [week, setWeek] = useState(getWeek(dayjs()));
  const [daySelected, setDaySelected] = useState<dayjs.Dayjs>(dayjs());
  const [showModalWindow, setShowModalWindow] = useState<string>('');
  const [modalPage, setModalPage] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<EventState>(EventInit);

  return (
    <GlobalContext.Provider value={{
      week,
      setWeek,
      daySelected,
      setDaySelected,
      selectedEvent,
      setSelectedEvent,
      showModalWindow,
      setShowModalWindow,
      modalPage,
      setModalPage,
      }}>
      {props.children}
    </GlobalContext.Provider>
  )
}