import React from 'react';
import dayjs from 'dayjs';
import { getWeek } from '../utils/getWeek';
import { EventInit } from './initialState';
import { EventState } from '../types/event';

const GlobalContext = React.createContext({
  week: getWeek(dayjs()),
  setWeek: (week: dayjs.Dayjs[]) => {},
  daySelected: dayjs(),
  setDaySelected: (day: dayjs.Dayjs) => {},
  selectedEvent: EventInit,
  setSelectedEvent: (event: EventState) => {},
  showModalWindow: '',
  setShowModalWindow: (open: string) => {},
  modalPage: '',
  setModalPage: (page: string) => {},
  isAuthenticated: true,
  setIsAuthenticated: (auth: boolean) => {},
})

export default GlobalContext;