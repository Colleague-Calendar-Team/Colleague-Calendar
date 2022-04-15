import React, { useContext, useEffect, useMemo, useState, memo } from 'react';
import { Routes, Route, useNavigate, Navigate, Outlet } from "react-router-dom";
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
import MainLayout from './components/layout/mainLayout';

function App() {
  if (DEBUG_RENDER) {
    console.log('render app');
  }

  const {getCurrentUserAccount, loadEvents, selectWeek, getToken} = useActions();
  const {loading, error} = useTypedSelector(state=>state.events);
  const { token } = useTypedSelector(state=>state.auth.login);
  const {modalWindow, selectedDay, selectedWeek} = useTypedSelector(state=>state.selectElements);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    selectWeek(getWeek(selectedDay));
  }, [selectedDay]);

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (token !== null) {
      setIsLoading(loading);
    }
  }, [loading]);

  useEffect(() => {
    if (token !== null) {
      setIsLoading(false);
    }
    if (token !== '' && token !== null) {
      loadEvents(token, dayjs());
      getCurrentUserAccount(token);
    }
  }, [token]);

  if (isLoading) {
    return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', width: '100%', height: '100vh', backgroundColor: theme.palette.secondary.main, color: theme.palette.primary.main}}>
      Loading...
    </Box>);
  }

  if (error) {
    return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', width: '100%', height: '100vh', backgroundColor: theme.palette.secondary.main, color: theme.palette.primary.main}}>
      Error of loading events data
    </Box>);
  }

  return (
    <Routes>
      <Route path="/" element={token ?
          <MainLayout color={theme.palette.primary.dark} bgColor={theme.palette.primary.main} element={
            <><Header week={selectedWeek}/>
              <Box sx={{ display: 'flex', backgroundColor: theme.palette.primary.main}}>
                <Sidebar/>
                <Week/>
              </Box>
              <Outlet/>
              </>} /> 
            : <Navigate to="/auth" replace/> }>
        <Route path="/events/:eventID" element={<EventWindow/>}/>
        <Route path="/events/add" element={<EventWindow/>}/>
        <Route path="/settings" element={<SettingsWindow/>}/>
      </Route>
      <Route path="/auth" element={<MainLayout 
                                      element={<AuthWindow/>} 
                                      color={theme.palette.primary.main} 
                                      bgColor={theme.palette.secondary.main} />}/>
      <Route path="*" element={<MainLayout 
                                      element={<div>Error 404: Not found</div>} 
                                      color={theme.palette.primary.main} 
                                      bgColor={theme.palette.secondary.main} />}/>
    </Routes>
  );
}

export default App;