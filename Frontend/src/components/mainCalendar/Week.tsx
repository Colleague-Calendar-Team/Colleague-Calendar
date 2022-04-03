import React, { useEffect, useState, memo } from "react";
import dayjs from "dayjs";
import Hour from "./Hour";
import { Grid, Typography } from "@mui/material";
import Event from "./Event";
import ReactDOM from "react-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { getIdOfHourInWeek } from "../../utils/getWeek";
import {DEBUG_RENDER} from '../../utils/debug';
import { useActions } from "../../hooks/useActions";
import { GenNumbersArr } from "../../utils/genArr";

const Week: React.FC = () => {
  if (DEBUG_RENDER) {
    console.log('selectedWeek render (memo+)');
  }

  const { selectModalWindow, selectEvent, selectHour } = useActions();
  const {events, renderWeek} = useTypedSelector(state=>state.events);
  const {selectedWeek} = useTypedSelector(state=>state.selectElements);
  const [prevEventsParents, setPrevEventsParents] = useState<Set<HTMLElement> | null>(null);

  const hours = GenNumbersArr(24);
  const days = GenNumbersArr(7);

  function renderEvents() {
    if (prevEventsParents) {
      prevEventsParents.forEach((parent) => {
        ReactDOM.unmountComponentAtNode(parent);
      });
    }
    if (events !== null && renderWeek >= 0 && renderWeek < 5) {
      console.log('Week element events:', events[renderWeek]);

      const eventsParents = new Set<HTMLElement>();
      events[renderWeek].forEach((event, id) => {
        const eventElement = (
          <Event
            event={event}
            eventId={id}
            setShowModalWindow={selectModalWindow}
            setSelectedEvent={selectEvent}
            selectHour={selectHour}
          ></Event>
        );

        const parent:(HTMLElement | null) = document.getElementById(getIdOfHourInWeek(dayjs(event.beginTime), selectedWeek[0]).toString());
        if (parent) {
          ReactDOM.render(eventElement, parent);
          eventsParents.add(parent);
        }
      });
      setPrevEventsParents(eventsParents);
    }
  }

  useEffect(() => {
    renderEvents();
  }, [selectedWeek]);

  return (
    <Grid container columns={{ xs: 8 }}>
      <Grid item xs={1}></Grid>
      {selectedWeek.map((day, dayId) => (
        <Grid item xs={1} key={dayId}>
          <Typography sx={{ textAlign: "center" }}>
            {day.format("ddd")} {day.format("DD")}
          </Typography>
        </Grid>
      ))}
      {hours.map((hour, hourId) => (
        <React.Fragment key={hourId}>
          <Grid item xs={1} key={hourId}>
            <Typography
              sx={{ textAlign: "right", fontSize: 10, mt: -0.5, mr: 1 }}
            >
              {hour}:00
            </Typography>
          </Grid>
          {days.map((day, dayId) => (
            <Grid item xs={1} key={dayId}>
              <Hour day={day} hour={hour} key={dayId}/>
            </Grid>
          ))}
        </React.Fragment>
      ))}
    </Grid>
  );
};

export default memo(Week);

