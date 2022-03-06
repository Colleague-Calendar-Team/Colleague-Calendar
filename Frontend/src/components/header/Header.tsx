import { useContext, useState } from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import dayjs from 'dayjs';
import Logo from '../../assets/logo';
import useButtonStyles from '../../styles/button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GlobalContext from '../../context/globalContext';
import { getWeek } from '../../utils/getWeek';
import { WeekState } from '../../types/week';

const Header:React.FC<WeekState> = ({week}) => {
  const classes = useButtonStyles();
  const {day, setDay} = useContext(GlobalContext);
  const firstDate = dayjs(new Date(week[0].year(), week[0].month()));
  const secondDate = dayjs(new Date(week[6].year(), week[6].month()));

  function clickPrevWeek() {
    setDay(dayjs(new Date(week[0].year(), week[0].month(), week[0].date() - 7)));
  };
  function clickNextWeek() {
    setDay(dayjs(new Date(week[0].year(), week[0].month(), week[0].date() + 7)));
  };
  function clickToday() {
    setDay(day === dayjs() ? day : dayjs());
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
              {firstDate.format("MMMM")}
              {week[0].year() !== week[6].year() && firstDate.format(" YYYY")}
              {week[0].month() !== week[6].month() && secondDate.format(" - MMMM")}
              {secondDate.format(" YYYY ")}
              {week[0].date()} - {week[6].date()}
            </Typography>
          <ChevronRightIcon onClick={clickNextWeek}/>
        </Box>
      </Toolbar>
  </AppBar>
  )
}

export default Header;