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

const Header:React.FC<WeekElementState> = ({week}) => {
  if (DEBUG_RENDER) {
    console.log('header render (memo+)');
  }

  // console.log('first:', dayjs(new Date(week[0].year(), week[0].month(), week[0].date())), ' second:', dayjs(new Date(week[6].year(), week[6].month(), week[6].date())))
  // console.log('week:', week)

  const classes = useButtonStyles();
  const {selectDay, changeWeek} = useActions();
  const {selectedDay} = useTypedSelector(state=>state.selectElements);
  const {renderWeek} = useTypedSelector(state=>state.events);

  const firstDate = dayjs(new Date(week[0].year(), week[0].month(), week[0].date()));
  const secondDate = dayjs(new Date(week[6].year(), week[6].month(), week[6].date()));

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
            {firstDate.year() !== secondDate.year() && firstDate.format(" YYYY")}
            {firstDate.month() !== secondDate.month() && secondDate.format(" - MMMM")}
            {secondDate.format(" YYYY ")}
            {firstDate.date()} - {secondDate.date()}
          </Typography>
        </Box>
        <UserBlock/>
      </Toolbar>
  </AppBar>
  )
}

export default Header;