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
import { Modal } from '@mui/material';
import { modalStyle } from './styles/modal';

function App() {
  if (DEBUG_RENDER) {
    console.log('render app');
  }

  const {getCurrentUserAccount, loadEvents, selectWeek, registerEnd, selectModalPage} = useActions();
  const {loading, error} = useTypedSelector(state=>state.events);
  const { token } = useTypedSelector(state=>state.auth.login);
  const {modalWindow, selectedDay, selectedWeek} = useTypedSelector(state=>state.selectElements);

  useEffect(() => {
    selectWeek(getWeek(selectedDay));
  }, [selectedDay]);

  useEffect(() => {
    if (token) {
      getCurrentUserAccount(token);
      loadEvents(token, dayjs());
    }
  }, [token]);

  return (
    <>
    {token !== '' && !loading && !error &&
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100vh', backgroundColor: theme.palette.primary.main, color: theme.palette.primary.dark}}>
      {modalWindow === 'event' && <EventWindow/>}
      {modalWindow === 'settings' && <SettingsWindow/>}
      
      <Header week={selectedWeek}/>
      <Box sx={{ display: 'flex', backgroundColor: theme.palette.primary.main}}>
        <Sidebar/>
        <Week/>
      </Box>
    </Box>}
    {token === '' &&
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100vh', backgroundColor: theme.palette.secondary.main, color: theme.palette.primary.main}}>
        <AuthWindow/>
      </Box>
    }
    {token !== '' && loading &&
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', width: '100%', height: '100vh', backgroundColor: theme.palette.secondary.main, color: theme.palette.primary.main}}>
        Loading...
      </Box>
    }
    </>
  );
}

export default App;