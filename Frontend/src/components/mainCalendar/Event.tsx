import React from "react";
import dayjs from "dayjs";
import { Box, Typography } from "@mui/material";
import useEventStyles from "../../styles/event";
import { EventState } from "../../types/event";
import { EventElementState } from "../../types/elements/eventElement";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Event: React.FC<EventElementState> =({event, eventId, setShowModalWindow, setSelectedEvent, selectHour}) => {
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

  return (
    <Box
      key={eventId}
      className={eventClasses.root}
      sx={getEventStyle(event)}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedEvent(event);
        setShowModalWindow('event');
        selectHour(-1);
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