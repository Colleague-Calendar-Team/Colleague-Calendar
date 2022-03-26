import { useContext } from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import dayjs from 'dayjs';
import Logo from '../../assets/logo';
import useButtonStyles from '../../styles/button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { WeekElementState } from '../../types/elements/weekElement';
import UserBlock from './UserBlock';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import {DEBUG_RENDER} from '../../utils/debug';

const Header:React.FC<WeekElementState> = ({week}) => {
  if (DEBUG_RENDER) {
    console.log('header render');
  }

  const classes = useButtonStyles();
  const {selectDay, changeWeek} = useActions();
  const {selectedDay} = useTypedSelector(state=>state.selectElements);
  const {renderWeek} = useTypedSelector(state=>state.events);

  const firstDate = dayjs(new Date(week[0].year(), week[0].month()));
  const secondDate = dayjs(new Date(week[6].year(), week[6].month()));

  function clickPrevWeek() {
    selectDay(dayjs(new Date(week[0].year(), week[0].month(), week[0].date() - 7)));
    changeWeek(renderWeek - 1);
  };
  function clickNextWeek() {
    selectDay(dayjs(new Date(week[0].year(), week[0].month(), week[0].date() + 7)));
    changeWeek(renderWeek + 1);
  };
  function clickToday() {
    selectDay(selectedDay === dayjs() ? selectedDay : dayjs());
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
          <ChevronRightIcon onClick={clickNextWeek}/>
            <Typography variant="h6" component="h2" sx={{m: 1}}>
              {firstDate.format("MMMM")}
              {week[0].year() !== week[6].year() && firstDate.format(" YYYY")}
              {week[0].month() !== week[6].month() && secondDate.format(" - MMMM")}
              {secondDate.format(" YYYY ")}
              {week[0].date()} - {week[6].date()}
            </Typography>
        </Box>
        <UserBlock/>
      </Toolbar>
  </AppBar>
  )
}

export default Header;