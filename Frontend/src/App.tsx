import { useContext, useEffect, useMemo, useState, memo } from 'react';
import dayjs from 'dayjs';
import './App.css';
import { Box } from '@mui/material';

import theme from './styles/theme';
import Sidebar from './components/sidebar/Sidebar';
import Week from './components/mainCalendar/Week';
import Header from './components/header/Header';
import { getWeek } from './utils/getWeek';
import EventWindow from './windows/eventWindow/EventWindow';
import SettingsWindow from './windows/settingsWindow/SettingsWindow';
import { useActions } from './hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelector';
import AuthWindow from './windows/authWindow/Auth';
import {DEBUG_RENDER} from './utils/debug';

function App() {
  if (DEBUG_RENDER) {
    console.log('render app');
  }

  const {loadUser, loadEvents, selectWeek} = useActions();
  const {loading} = useTypedSelector(state=>state.events);
  const {modalWindow, selectedDay, selectedWeek} = useTypedSelector(state=>state.selectElements);
  const {isAuthenticated} = useTypedSelector(state=>state.user);

  useEffect(() => {
    loadUser();
    loadEvents();
  }, []);

  useEffect(() => {
    selectWeek(getWeek(selectedDay));
  }, [selectedDay]);

  return (
    <>
    {isAuthenticated && !loading &&
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100vh', backgroundColor: theme.palette.primary.main, color: theme.palette.primary.dark}}>
      {modalWindow === 'event' && <EventWindow/>}
      {modalWindow === 'settings' && <SettingsWindow/>}
      
      <Header week={selectedWeek}/>
      <Box sx={{ display: 'flex', backgroundColor: theme.palette.primary.main}}>
        <Sidebar/>
        <Week/>
      </Box>
    </Box>}
    {!isAuthenticated &&
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100vh', backgroundColor: theme.palette.secondary.main, color: theme.palette.primary.main}}>
        <AuthWindow/>
      </Box>
    }
    {isAuthenticated && loading &&
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', width: '100%', height: '100vh', backgroundColor: theme.palette.secondary.main, color: theme.palette.primary.main}}>
        Loading...
      </Box>
    }
    </>
  );
}

export default App;