import { Box, Button, TextField } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import dayjs from "dayjs";
import useButtonStyles from "../../styles/button";
import { useActions } from "../../hooks/useActions";
import { EventState, EventInit } from "../../types/event";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { getHourById } from "../../utils/getWeek";
import {DEBUG_RENDER} from "../../utils/debug";

const GeneralEventInfo = () => {
  const { selectedEvent, selectedHour, selectedWeek } = useTypedSelector(
    (state) => state.selectElements
  );
  if (DEBUG_RENDER) {
    console.log('render GeneralEventInfo ', selectedHour);
  }

  const classes = useButtonStyles();
  const { selectModalWindow, selectModalPage } = useActions();
  
  const [event, setEvent] = useState(
    selectedHour === -1
      ? selectedEvent
      : EventInit({
          beginTime: getHourById(selectedHour, selectedWeek[0]).format("YYYY-MM-DDTHH:mm"),
          endTime: getHourById(selectedHour + 1, selectedWeek[0]).format("YYYY-MM-DDTHH:mm"),
        })
  );

  function eventSubmit() {
    selectModalWindow("");
  }

  function Next() {
    selectModalPage("Участники");
  }

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "95%" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="title"
        label="Название мероприятия"
        variant="outlined"
        size="small"
        defaultValue={event.title}
        onChange={(e) => setEvent({ ...event, title: e.target.value })}
      />
      <TextField
        id="date-begin"
        label="Дата и время начала"
        type="datetime-local"
        defaultValue={event.beginTime}
        onChange={(e) => setEvent({ ...event, beginTime: e.target.value })}
        size="small"
      />
      <TextField
        id="date-end"
        label="Дата и время окончания"
        type="datetime-local"
        defaultValue={event.endTime}
        onChange={(e) => setEvent({ ...event, endTime: e.target.value })}
        size="small"
      />
      <TextField
        id="location"
        label="Местоположение"
        variant="outlined"
        size="small"
        defaultValue={event.meetingLink}
        onChange={(e) => setEvent({ ...event, meetingLink: e.target.value })}
      />
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              id="repeated"
              checked={event.isRepeating}
              onChange={(e) =>
                setEvent({ ...event, isRepeating: Boolean(e.target.value) })
              }
            />
          }
          label="Повторяющееся мероприятие"
        />
      </FormGroup>
      <TextField
        id="description"
        label="Описание"
        variant="outlined"
        multiline
        maxRows={4}
        size="small"
        defaultValue={event.description}
        onChange={(e) => setEvent({ ...event, description: e.target.value })}
      />
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button className={classes.root} onClick={Next}>
          Далее
        </Button>
      </Box>
    </Box>
  );
};

export default GeneralEventInfo;
