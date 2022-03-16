import React, { useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import { Box } from "@mui/material";
import { HourElementState } from "../../types/elements/hourElement";
import GlobalContext from "../../context/globalContext";
import useHourStyles from "../../styles/hour";
import { EventState } from "../../types/event";
import Event from './Event';

const Hour: React.FC<HourElementState> = ({ day, hour }) => {
  const [hourEvents, setHourEvents] = useState<EventState[]>([]);
  const hourClasses = useHourStyles();
  const { setDaySelected, setShowModalWindow } = useContext(GlobalContext);

  useEffect(() => {
    const event: EventState = {
      title: "Пример события",
      beginTime: "2022-03-13T9:00",
      endTime: "2022-03-13T14:00",
      description: "description",
      meetingLink: "meeting link",
      isRepeating: false,
    };
    setHourEvents([event]);
  }, []);

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
        setShowModalWindow(true);
      }}
    >
      <Box className={hourClasses.root} sx={getCellStyle(day, hour)}>
        {/* {day.format("DD")} */}
        {hourEvents.map((event, id) => (
          <Event event={event} day={day} hour={hour} eventId={id}></Event>
        ))}
      </Box>
    </Box>
  );
};

export default Hour;
