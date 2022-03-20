import React, { useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import { Box } from "@mui/material";
import { HourElementState } from "../../types/elements/hourElement";
import GlobalContext from "../../context/globalContext";
import useHourStyles from "../../styles/hour";
import { EventState } from "../../types/event";
import Event from './Event';
import { EventInit } from "../../context/initialState";

const Hour: React.FC<HourElementState> = ({ day, hour }) => {
  // const [hourEvents, setHourEvents] = useState<EventState[]>([]);
  const hourClasses = useHourStyles();
  const { setDaySelected, setShowModalWindow, setSelectedEvent } = useContext(GlobalContext);

  function getCellStyle(day: dayjs.Dayjs, hour: number) {
    return {
      borderLeft: 1,
      borderTop: hour === 0 ? 1 : 0,
      borderBottom: hour === 23 ? 1 : 0,
      borderRight: day.day() === 7 ? 1 : 0,
    };
  }

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column" }}
      onClick={() => {
        setDaySelected(
          dayjs(
            new Date(
              dayjs(day).year(),
              dayjs(day).month(),
              dayjs(day).date(),
              hour
            )
          )
        );
        setSelectedEvent(EventInit);
        setShowModalWindow('event');
      }}
    >
      <Box id={dayjs(
            new Date(
              dayjs(day).year(),
              dayjs(day).month(),
              dayjs(day).date(),
              hour
            )).format('YYYY-MM-DDTHH:mm')} className={hourClasses.root} sx={getCellStyle(day, hour)}>
        {/* {day.format("DD")} */}
        {/* {hourEvents.map((event, id) => ( */}
          {/* <Event event={event} day={day} hour={hour} eventId={id}></Event> */}
        {/* ))} */}
      </Box>
    </Box>
  );
};

export default Hour;
