import React, { useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import { Box, Typography } from "@mui/material";
import useEventStyles from "../../styles/event";
import { EventState } from "../../types/event";
import { EventElementState } from "../../types/elements/eventElement";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Event: React.FC<EventElementState> =({event, day, hour, eventId, setShowModalWindow, setSelectedEvent}) => {
  const eventClasses = useEventStyles();

  function getEventStyle(event: EventState) {
    const begin = dayjs(event.beginTime, "YYYY-MM-DDTHH:mm");
    const end = dayjs(event.endTime, "YYYY-MM-DDTHH:mm");
    const beginHour = dayjs(begin).hour();
    const endHour =  dayjs(end).hour();
    let height = ((endHour ? endHour : 24) - beginHour) * 3;

    return {
      height: `${height}em`,
    };
  }

  // function hourHasEvent(event: EventState, day: dayjs.Dayjs, hour: number) {
  //   const begin = dayjs(event.beginTime, "YYYY-MM-DDTHH:mm");

  //   if (
  //     dayjs(begin).year() === dayjs(day).year() &&
  //     dayjs(begin).month() === dayjs(day).month() &&
  //     dayjs(begin).date() === dayjs(day).date() &&
  //     hour === dayjs(begin).hour()
  //   ) {
  //     return true;
  //   }

  //   return false;
  // }

  // if (!hourHasEvent(event, day, hour)) {
  //   return <></>;
  // }

  return (
    <Box
      key={eventId}
      className={eventClasses.root}
      sx={getEventStyle(event)}
      onClick={() => {
        setSelectedEvent(event);
        setShowModalWindow('event');
      }}
    >
      <Box sx={{display: 'flex', flexDirection: 'column', textAlign: 'start', ml: 1}}>
        <Typography sx={{fontWeight: 'bold'}}>{event.title}</Typography>
        <Typography >{dayjs(event.beginTime).hour()}:00 - {dayjs(event.endTime).hour()}:00</Typography>
      </Box>
      <DeleteOutlineIcon />
    </Box>
  );
}

export default Event;