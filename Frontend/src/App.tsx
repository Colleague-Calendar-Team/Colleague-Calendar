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

function App() {
  const [curWeek, setCurWeek] = useState(getWeek());
  const {day} = useContext(GlobalContext);

  useEffect(() => {
    setCurWeek(getWeek(day));
  }, [day]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100vh', backgroundColor: theme.palette.primary.main }}>
      <Header/>
      <Box sx={{ display: 'flex', backgroundColor: theme.palette.primary.main}}>
        <Sidebar/>
        <Week week={curWeek}/>
      </Box>
    </Box>
  );
}

export default App;
