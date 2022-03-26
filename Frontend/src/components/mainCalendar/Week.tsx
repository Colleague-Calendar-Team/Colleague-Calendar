import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import Hour from "./Hour";
import { Grid, Typography } from "@mui/material";
import { WeekElementState } from "../../types/elements/weekElement";
import { EventState } from "../../types/event";
import Event from "./Event";
import ReactDOM from "react-dom";
import GlobalContext from "../../context/globalContext";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { getIdOfHourInWeek, getWeek } from "../../utils/getWeek";
import {DEBUG_RENDER} from '../../utils/debug';

const Week: React.FC<WeekElementState> = ({week}) => {
  if (DEBUG_RENDER) {
    console.log('week render');
  }

  const {setShowModalWindow, setSelectedEvent, renderWeek } = useContext(GlobalContext);
  const {events} = useTypedSelector(state=>state.events);
  const [prevEventsParents, setPrevEventsParents] = useState<Set<HTMLElement> | null>(null);
  // const [prevBeginDay, setPrevBeginDay] = useState(dayjs());

  function getHours(): number[] {
    let hours: number[] = [];
    for (let i: number = 0; i < 24; i++) {
      hours.push(i);
    }

    return hours;
  }
  const hours = getHours();

  // useEffect(() => {
  //   console.log('change week')
  //   setWeek(getWeek(daySelected))
  // }, [daySelected]);

  useEffect(() => {
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
            day={dayjs(event.beginTime)}
            hour={dayjs(event.beginTime).hour()}
            eventId={id}
            setShowModalWindow={setShowModalWindow}
            setSelectedEvent={setSelectedEvent}
          ></Event>
        );

        const parent:(HTMLElement | null) = document.getElementById(getIdOfHourInWeek(dayjs(event.beginTime), week[0]).toString());
        if (parent) {
          ReactDOM.render(eventElement, parent);
          eventsParents.add(parent);
        }
      });
      setPrevEventsParents(eventsParents);
    }
  }, [renderWeek]);

  return (
    <Grid container columns={{ xs: 8 }}>
      <Grid item xs={1}></Grid>
      {week.map((day, dayId) => (
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
          {week.map((day, dayId) => (
            <Grid item xs={1} key={dayId}>
              <Hour day={day} hour={hour} key={dayId} id={dayId*24 + hourId}/>
            </Grid>
          ))}
        </React.Fragment>
      ))}
    </Grid>
  );
};

export default Week;

