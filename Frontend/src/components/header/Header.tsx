import { useContext } from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import dayjs from 'dayjs';
import Logo from '../../assets/logo';
import useButtonStyles from '../../styles/button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GlobalContext from '../../context/globalContext';

export default function Header() {
  const {day, setDay} = useContext(GlobalContext);
  const classes = useButtonStyles();

  function clickPrevWeek() {
    setDay(dayjs(new Date(day.year(), day.month(), day.day() - 7)));
    console.log("day: ", day.day())
  };
  function clickNextWeek() {
    setDay(dayjs(new Date(day.year(), day.month(), day.day() + 7)));
  };
  function clickToday() {
    setDay(day === dayjs()
    ? day : dayjs());
  };

  return (
    <AppBar position="static">
      <Toolbar disableGutters>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', alignItems: 'center' }, pl: 1 }}>
          <Logo width={40} height={40}/>
          <Typography variant="h6" component="h2" sx={{m: 1}}>
              Colleague Calendar
          </Typography>
          <Button className={classes.root} onClick={clickToday}>Сегодня</Button>
          <ChevronLeftIcon onClick={clickPrevWeek}/>
            <Typography variant="h6" component="h2" sx={{m: 1}}>
              {dayjs(new Date(dayjs().year(), day.month())).format("MMMM YYYY ")}
              {day.day() + 1} - {day.day() + 7}
            </Typography>
          <ChevronRightIcon onClick={clickNextWeek}/>
        </Box>
      </Toolbar>
  </AppBar>
  )
}
