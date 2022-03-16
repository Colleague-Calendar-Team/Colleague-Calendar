import React from 'react';
import dayjs from 'dayjs';
import Hour from './Hour';
import { Grid, Typography } from '@mui/material';
import { WeekElementState } from '../../types/elements/weekElement';

const Week:React.FC<WeekElementState> = ({week}) => {
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
          <Hour day={day} hour={hour} key={dayId}/>
        </Grid>         
        ))}
      </React.Fragment>
    )}
  </Grid>);
}

export default Week;