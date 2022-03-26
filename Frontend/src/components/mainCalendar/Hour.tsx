import React, { useContext, useState, useEffect, memo } from "react";
import dayjs from "dayjs";
import { Box } from "@mui/material";
import { HourElementState } from "../../types/elements/hourElement";
import useHourStyles from "../../styles/hour";
import { EventState, EventInit } from "../../types/event";
import Event from './Event';
import { DEBUG_RENDER } from "../../utils/debug";
import { getHourById } from "../../utils/getWeek";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const Hour: React.FC<HourElementState> = ({ day, hour }) => {
  if (DEBUG_RENDER) {
    console.log('hour render (memo+)');
  }

  const id = day*24 + hour;
  const hourClasses = useHourStyles();
  const { selectModalWindow, selectHour } = useActions();

  function getCellStyle(day: number, hour: number) {
    return {
      borderLeft: 1,
      borderTop: hour === 0 ? 1 : 0,
      borderBottom: hour === 23 ? 1 : 0,
      borderRight: day === 6 ? 1 : 0,
    };
  }

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column" }}
      onClick={() => {
        selectHour(id);
        selectModalWindow('event');
      }}
    >
      <Box id={id.toString()} className={hourClasses.root} sx={getCellStyle(day, hour)}>
      {/* id={dayjs(
      //       new Date(
      //         dayjs(day).year(),
      //         dayjs(day).month(),
      //         dayjs(day).date(),
      //         hour
      //       )).format('YYYY-MM-DDTHH:mm')} className={hourClasses.root} sx={getCellStyle(day, hour)}>
        {/* {day.format("DD")} */}
        {/* {hourEvents.map((event, id) => ( */}
          {/* <Event event={event} day={day} hour={hour} eventId={id}></Event> */}
        {/* ))} */}
        {/* {id} */}
      </Box>
    </Box>
  );
};

export default memo(Hour);
