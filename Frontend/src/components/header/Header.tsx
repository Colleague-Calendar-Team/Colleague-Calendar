import { useState } from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import dayjs from 'dayjs';
import Logo from '../../assets/logo';
import useButtonStyles from '../../styles/button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function Header() {
  const [monthId, setMonthId] = useState(dayjs().month());
  const classes = useButtonStyles();

  function clickPrevMonth() {
    setMonthId(monthId - 1);
  };
  function clickNextMonth() {
    setMonthId(monthId + 1);
  };
  function clickToday() {
    setMonthId(monthId === dayjs().month() 
    ? monthId + Math.random()
    : dayjs().month());
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
          <ChevronLeftIcon onClick={clickPrevMonth}/>
              <div className="fs-5 mb-1">{dayjs(new Date(dayjs().year(), monthId)).format("MMMM YYYY")}</div>
          <ChevronRightIcon onClick={clickNextMonth}/>
        </Box>
      </Toolbar>
  </AppBar>
  )
}
