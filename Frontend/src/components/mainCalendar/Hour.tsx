import React, { memo } from "react";
import { Box } from "@mui/material";
import { HourElementState } from "../../types/elements/hourElement";
import useHourStyles from "../../styles/hour";
import { DEBUG_RENDER } from "../../utils/debug";
import { useActions } from "../../hooks/useActions";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import dayjs from "dayjs";
import { getHourById, getIdOfHourInWeek } from "../../utils/getWeek";
import Event from './Event';

const Hour: React.FC<HourElementState> = ({ day, hour }) => {
  if (DEBUG_RENDER) {
    console.log('hour render (memo+)');
  }

  const hourClasses = useHourStyles();
  const { selectModalWindow, selectHour, selectEvent } = useActions();
  const {events, renderWeek} = useTypedSelector(state=>state.events);
  const {selectedWeek} = useTypedSelector(state=>state.selectElements);
  const id = day*24 + hour;
  const time = getHourById(id, selectedWeek[0]).format("YYYY-MM-DDTHH:mm");
  const navigate = useNavigate();

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
      onClick={(e) => {
        selectHour(id);
        selectModalWindow('eventCreate');
        navigate('/events/add');
      }}
    >
      <Box id={id.toString()} className={hourClasses.root} sx={getCellStyle(day, hour)}>
        {events.length > 0 && renderWeek >= 0 && renderWeek < 5 &&
          events[renderWeek].map((event, idx)=>{
            if (event.beginTime === time) {
              return <Event
                          event={event}
                          eventId={id}
                          setShowModalWindow={selectModalWindow}
                          setSelectedEvent={selectEvent}
                          selectHour={selectHour}
                          key={idx}></Event>
            }
          })
        }
      </Box>
    </Box>
  );
};

export default memo(Hour);
