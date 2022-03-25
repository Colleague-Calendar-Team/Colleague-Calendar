import React, { useContext, useEffect } from "react";
import dayjs from "dayjs";
import Hour from "./Hour";
import { Grid, Typography } from "@mui/material";
import { WeekElementState } from "../../types/elements/weekElement";
import { EventState } from "../../types/event";
import Event from "./Event";
import ReactDOM from "react-dom";
import GlobalContext from "../../context/globalContext";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const Week: React.FC<WeekElementState> = ({ week }) => {
  const {setShowModalWindow, setSelectedEvent} = useContext(GlobalContext);
  const {events} = useTypedSelector(state=>state.events);

  function getHours(): number[] {
    let hours: number[] = [];
    for (let i: number = 0; i < 24; i++) {
      hours.push(i);
    }

    return hours;
  }
  const hours = getHours();

  useEffect(() => {
    console.log('Week element events:', events)
    if (events !== null) {
      events[0].forEach((event, id) => {
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
        const parent = document.getElementById(event.beginTime);
        if (parent) {
          ReactDOM.render(eventElement, parent);
        }
      });
    }
  }, []);

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
              <Hour day={day} hour={hour} key={dayId} />
            </Grid>
          ))}
        </React.Fragment>
      ))}
    </Grid>
  );
};

export default Week;

