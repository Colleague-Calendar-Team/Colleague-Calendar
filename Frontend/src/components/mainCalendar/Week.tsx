import React, { useContext, useEffect } from "react";
import dayjs from "dayjs";
import Hour from "./Hour";
import { Grid, Typography } from "@mui/material";
import { WeekElementState } from "../../types/elements/weekElement";
import { EventState } from "../../types/event";
import Event from "./Event";
import ReactDOM from "react-dom";
import GlobalContext from "../../context/globalContext";

const Week: React.FC<WeekElementState> = ({ week }) => {
  const {setShowModalWindow, setSelectedEvent} = useContext(GlobalContext);

  function getHours(): number[] {
    let hours: number[] = [];
    for (let i: number = 0; i < 24; i++) {
      hours.push(i);
    }

    return hours;
  }
  const hours = getHours();

  useEffect(() => {
    const events: EventState[] = [
      {
        title: "Пример события1",
        beginTime: "2022-03-22T05:00",
        endTime: "2022-03-22T07:00",
        description: "description",
        meetingLink: "meeting link",
        isRepeating: false,
      },
      {
        title: "Пример события2",
        beginTime: "2022-03-24T09:00",
        endTime: "2022-03-24T14:00",
        description: "description",
        meetingLink: "meeting link",
        isRepeating: false,
      },
      {
        title: "Пример события3",
        beginTime: "2022-03-27T14:00",
        endTime: "2022-03-27T20:00",
        description: "description",
        meetingLink: "meeting link",
        isRepeating: false,
      },
    ];
    events.forEach((event, id) => {
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

