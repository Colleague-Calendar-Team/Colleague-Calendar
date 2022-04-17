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
import { DEBUG_RENDER } from '../../utils/debug';
import { getFirstDayForToday, getNextFirstDay, getPrevFirstDay } from './../../utils/getWeek';

const Header:React.FC<WeekElementState> = ({week}) => {
  if (DEBUG_RENDER) {
    console.log('header render (memo+)');
  }

  // console.log('first:', dayjs(new Date(week[0].year(), week[0].month(), week[0].date())), ' second:', dayjs(new Date(week[6].year(), week[6].month(), week[6].date())))
  // console.log('week:', week)

  const classes = useButtonStyles();
  const {selectDay, changeWeek, loadEvents, changeFirstDate} = useActions();
  const {token} = useTypedSelector(state=>state.auth.login);
  const {selectedDay} = useTypedSelector(state=>state.selectElements);
  const {renderWeek, firstDate} = useTypedSelector(state=>state.events);

  function clickPrevWeek() {
    selectDay(week[0].add(-7, 'days'));
    if (renderWeek === 0) {
      const newFirstDate = getPrevFirstDay(firstDate);
      changeFirstDate(newFirstDate);
      loadEvents(token === null ? '' : token, newFirstDate);
      changeWeek(4);
    } else {
      changeWeek(renderWeek - 1);
    }
  };
  function clickNextWeek() {
    selectDay(week[0].add(7, 'days'));
    if (renderWeek === 4) {
      const newFirstDate = getNextFirstDay(firstDate);
      changeFirstDate(newFirstDate);
      loadEvents(token === null ? '' : token, newFirstDate);
      changeWeek(0);
    } else {
      changeWeek(renderWeek + 1);
    }
  };
  function clickToday() {
    selectDay(selectedDay === dayjs() ? selectedDay : dayjs());
    const firstDateForToday = getFirstDayForToday(dayjs());
    if (firstDateForToday !== firstDate) {
      changeFirstDate(firstDateForToday);
      loadEvents(token === null ? '' : token, firstDateForToday);
    }
    changeWeek(2);
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
            {week[0].format("MMMM")}
            {week[0].year() !== week[6].year() && week[0].format(" YYYY")}
            {week[0].month() !== week[6].month() && week[6].format(" - MMMM")}
            {week[6].format(" YYYY ")}
            {week[0].date()} - {week[6].date()}
          </Typography>
        </Box>
        <UserBlock/>
      </Toolbar>
  </AppBar>
  )
}

export default Header;