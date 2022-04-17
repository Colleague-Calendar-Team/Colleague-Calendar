import React, {useState, useEffect, useContext} from 'react';
import dayjs from 'dayjs';
import { Box, TextField } from '@mui/material';
import themeCalendarPicker from '../../styles/calendarPicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import { ThemeProvider } from '@mui/material/styles';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { getFirstDayForToday, getRenderWeekForSelectedDay } from '../../utils/getWeek';

export default function NavigateCalendar() {
  const {selectDay, changeWeek, changeFirstDate, loadEvents} = useActions();
  const {selectedDay} = useTypedSelector(state=>state.selectElements); 
  const {token} = useTypedSelector(state=>state.auth.login);
  const {firstDate, renderWeek, events} = useTypedSelector(state=>state.events);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column'}}>
      <ThemeProvider theme={themeCalendarPicker}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            value={selectedDay}
            onChange={(day) => {
              if (day !== null) {
                selectDay(day);
                
                const firstDateForToday = getFirstDayForToday(day);
                const diff = firstDate.diff(firstDateForToday, 'day');
                if (diff < -14 || diff > 14) {
                  changeFirstDate(firstDateForToday);
                  loadEvents(token === null ? '' : token, firstDateForToday);
                  changeWeek(getRenderWeekForSelectedDay(day, firstDateForToday));
                } else {
                  changeWeek(getRenderWeekForSelectedDay(day, firstDate));
                }
              } else {
                selectDay(dayjs());
                changeWeek(2);
              }
            }}
            renderInput={(params) => <TextField {...params} 
            />}
          />
        </LocalizationProvider>
      </ThemeProvider>
    </Box>
  );
}