import React from 'react';
import dayjs from 'dayjs';
import Day from './Day';
import { Grid, Typography } from '@mui/material';
import { WeekState } from '../../types/week';

const Week:React.FC<WeekState> = ({week}) => {
  function getHours(): number[] {
    let hours: number[] = [];
    for (let i: number = 0; i < 24; i++) {
      hours.push(i);
    }

    return hours;
  }
  const hours = getHours();

  return (
  <Grid container columns={{ xs: 8 }}>
    <Grid item xs={1}></Grid>
    {week.map((day, dayId) => 
      <Grid item xs={1} key={dayId}>
        <Typography sx={{textAlign: 'center'}}>
          {day.format('ddd')} {day.format('DD')}
        </Typography>
      </Grid>
    )}
    {hours.map((hour, hourId) =>
      <React.Fragment key={hourId}>
        <Grid item xs={1} key={hourId}>
          <Typography sx={{textAlign: 'right', fontSize: 10, mt: -0.5, mr: 1 }}>
            {hour}:00
          </Typography>
        </Grid>
        {week.map((day, dayId) => (
        <Grid item xs={1} key={dayId}>
          <Day day={day} hour={hour} key={dayId}/>
        </Grid>         
        ))}
      </React.Fragment>
    )}
  </Grid>);
}

export default Week;