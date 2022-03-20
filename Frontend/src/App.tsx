import { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import './App.css';
import { Box } from '@mui/material';

import theme from './styles/theme';
import Sidebar from './components/sidebar/Sidebar';
import Week from './components/mainCalendar/Week';
import Header from './components/header/Header';
import { getWeek } from './utils/getWeek';
import GlobalContext from './context/globalContext';
import EventWindow from './windows/eventWindow/EventWindow';
import SettingsWindow from './windows/settingsWindow/SettingsWindow';
import { useActions } from './hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelector';
import AuthWindow from './windows/authWindow/Auth';

function App() {
  const {daySelected, showModalWindow, isAuthenticated} = useContext(GlobalContext);
  const [week, setWeek] = useState((getWeek()));
  const {loadUser} = useActions();

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    setWeek(getWeek(daySelected));
  }, [daySelected]);

  return (
    <>
    {isAuthenticated &&
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100vh', backgroundColor: theme.palette.primary.main, color: theme.palette.primary.dark}}>
      {showModalWindow === 'event' && <EventWindow/>}
      {showModalWindow === 'settings' && <SettingsWindow/>}
      
      <Header week={week}/>
      <Box sx={{ display: 'flex', backgroundColor: theme.palette.primary.main}}>
        <Sidebar/>
        <Week week={week}/>
      </Box>
    </Box>}
    {!isAuthenticated &&
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100vh', backgroundColor: theme.palette.secondary.main, color: theme.palette.primary.main}}>
        <AuthWindow/>
      </Box>
    }
    </>
  );
}

export default App;
