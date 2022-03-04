import { useState } from 'react';
import './App.css';
import { Box } from '@mui/material';

import theme from './styles/theme';
import Sidebar from './components/sidebar/Sidebar';
import Week from './components/mainCalendar/Week';
import Header from './components/header/Header';
import { getWeek } from './utils/getWeek';

function App() {
  const [curWeek ] = useState(getWeek());

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
