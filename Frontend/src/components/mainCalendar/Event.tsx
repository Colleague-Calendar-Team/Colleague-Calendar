import React, { useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import { Box } from "@mui/material";
import useEventStyles from "../../styles/event";
import { EventState } from "../../types/event";
import { EventElementState } from "../../types/elements/eventElement";

const Event: React.FC<EventElementState> =({event, day, hour, eventId}) => {
  const eventClasses = useEventStyles();

  function hourHasEvent(event: EventState, day: dayjs.Dayjs, hour: number) {
    const begin = dayjs(event.beginTime, "YYYY-MM-DDTHH:mm");

    if (
      dayjs(begin).year() === dayjs(day).year() &&
      dayjs(begin).month() === dayjs(day).month() &&
      dayjs(begin).date() === dayjs(day).date() &&
      hour === dayjs(begin).hour()
    ) {
      return true;
    }

    return false;
  }
  function getEventStyle(event: EventState) {
    const begin = dayjs(event.beginTime, "YYYY-MM-DDTHH:mm");
    const end = dayjs(event.endTime, "YYYY-MM-DDTHH:mm");
    let height = (dayjs(end).hour() - dayjs(begin).hour()) * 3;

    return {
      height: `${height}em`,
    };
  }

  if (!hourHasEvent(event, day, hour)) {
    return <></>;
  }

  return (
    <Box
      key={eventId}
      className={eventClasses.root}
      sx={getEventStyle(event)}
    >
      {event.title}
    </Box>
  );
}

export default Event;
