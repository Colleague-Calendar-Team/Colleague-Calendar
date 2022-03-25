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
import { getIdOfRenderWeek, getWeek } from "../../utils/getWeek";

const Week: React.FC<WeekElementState> = ({ }) => {
  const {setShowModalWindow, setSelectedEvent, renderWeek, daySelected } = useContext(GlobalContext);
  const week = getWeek(daySelected);
  const {events} = useTypedSelector(state=>state.events);
  const [prevWeek, setPrevWeek] = useState(renderWeek);
  const [prevBeginDay, setPrevBeginDay] = useState(dayjs());

  function getHours(): number[] {
    let hours: number[] = [];
    for (let i: number = 0; i < 24; i++) {
      hours.push(i);
    }

    return hours;
  }
  const hours = getHours();

  useEffect(() => {
    if (events !== null && prevWeek >= 0 && prevWeek < 5) {
      console.log("prev week: ", prevWeek);
      events[prevWeek].forEach((event, id) => {
        const parent = document.getElementById(getIdOfRenderWeek(dayjs(event.beginTime), prevBeginDay).toString());
        console.log('parent:', parent, 'id:', getIdOfRenderWeek(dayjs(event.beginTime), prevBeginDay).toString(), 'event: ', event.beginTime);
        if (parent) {
          ReactDOM.unmountComponentAtNode(parent);
        }
      });
    }
    if (events !== null && renderWeek >= 0 && renderWeek < 5) {
      console.log('Week element events:', events[renderWeek]);
      console.log('Week 0:', week[0]);
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
        const parent = document.getElementById(getIdOfRenderWeek(dayjs(event.beginTime), week[0]).toString());
        if (parent) {
          ReactDOM.render(eventElement, parent);
        }
      });
    }
    setPrevWeek(renderWeek);
    setPrevBeginDay(week[0]);
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

