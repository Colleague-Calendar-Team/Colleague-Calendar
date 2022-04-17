import React from "react";
import dayjs from "dayjs";
import { Box, Typography } from "@mui/material";
import useEventStyles from "../../styles/event";
import { EventState } from "../../types/event/event";
import { EventElementState } from "../../types/elements/eventElement";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate, Link } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const Event: React.FC<EventElementState> =({event, eventId, setShowModalWindow, setSelectedEvent, selectHour}) => {
  const eventClasses = useEventStyles();
  const navigate = useNavigate();
  const {deleteEvent} = useActions();
  const {token} = useTypedSelector(state=>state.auth.login);

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

  function onDelete(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    e.stopPropagation();
    deleteEvent(token === null ? '' : token, event.eventID);
  }

  return (
      <Box
        key={eventId}
        className={eventClasses.root}
        sx={getEventStyle(event)}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedEvent(event);
          setShowModalWindow('eventEdit');
          console.log('EVENT ID:');
          console.log(event)
          navigate(`/events/${event.eventID}`);
          selectHour(-1);
        }}
      >
        <Box sx={{display: 'flex', flexDirection: 'column', textAlign: 'start', ml: 1}}>
          <Typography sx={{fontWeight: 'bold'}}>{event.title}</Typography>
          <Typography >{dayjs(event.beginTime).hour()}:00 - {dayjs(event.endTime).hour()}:00</Typography>
        </Box>
        <DeleteOutlineIcon onClick={(e) => onDelete(e)}/>
      </Box>
  );
}

export default Event;