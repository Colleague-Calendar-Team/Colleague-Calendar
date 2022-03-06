import React, {useState, useEffect, useContext} from 'react';
import dayjs from 'dayjs';
import GlobalContext from '../../context/globalContext';
import { Box, TextField } from '@mui/material';
import themeCalendarPicker from '../../styles/calendarPicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import { ThemeProvider } from '@mui/material/styles';

export default function NavigateCalendar() {
  const { daySelected, setDaySelected } = useContext(GlobalContext);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column'}}>
      <ThemeProvider theme={themeCalendarPicker}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            value={daySelected}
            onChange={(day) => {
              if (day !== null) {
                setDaySelected(day);
              } else {
                setDaySelected(dayjs());
              }
            }}
            // onMonthChange={(day) => {
            //   const selectDay = dayjs(day).month();
            //   if (selectDay !== null) {
            //     setCurMonthId(selectDay);
            //   } else {
            //     setCurMonthId(0);
            //   }
            // }}
            renderInput={(params) => <TextField {...params} 
            />}
          />
        </LocalizationProvider>
      </ThemeProvider>
    </Box>
  );
}