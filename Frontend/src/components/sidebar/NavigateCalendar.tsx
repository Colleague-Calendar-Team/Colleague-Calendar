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

export default function NavigateCalendar() {
  const {selectDay} = useActions();
  const {selectedDay} = useTypedSelector(state=>state.selectElements); 

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
              } else {
                selectDay(dayjs());
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