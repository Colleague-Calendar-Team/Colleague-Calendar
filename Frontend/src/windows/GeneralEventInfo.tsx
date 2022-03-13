import { Box, Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import dayjs from "dayjs";
import GlobalContext from "../context/globalContext";
import useButtonStyles from "../styles/button";
import { useActions } from "../hooks/useActions";
import { EventState } from "../types/event";

const GeneralEventInfo = () => {
  const { daySelected } = useContext(GlobalContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [beginTime, setBeginTime] = useState(dayjs().format("YYYY-MM-DDTHH:mm"));
  const [endTime, setEndTime] = useState(dayjs().format("YYYY-MM-DDTHH:mm"));
  const [meetingLink, setMeetingLink] = useState("");
  const [isRepeating, setIsRepeating] = useState(false);

  const classes = useButtonStyles();
  const {saveEvent} = useActions();
  const {setShowModalWindow} = useContext(GlobalContext);

  function eventSubmit() {
    const event: EventState = {title, description, beginTime, endTime, meetingLink, isRepeating};
    saveEvent(event);
    setShowModalWindow(false);
  }

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "90%" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="title"
        label="Название мероприятия"
        variant="outlined"
        size="small"
        defaultValue={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        id="date-begin"
        label="Дата и время начала"
        type="datetime-local"
        defaultValue={
          daySelected
            ? dayjs(daySelected).format("YYYY-MM-DDTHH:mm")
            : beginTime
        }
        onChange={(e) => setBeginTime(e.target.value)}
        size="small"
      />
      <TextField
        id="date-end"
        label="Дата и время окончания"
        type="datetime-local"
        defaultValue={
          daySelected ? dayjs(daySelected).format("YYYY-MM-DDTHH:mm") : endTime
        }
        onChange={(e) => setEndTime(e.target.value)}
        size="small"
      />
      <TextField
        id="location"
        label="Местоположение"
        variant="outlined"
        size="small"
        defaultValue={meetingLink}
        onChange={(e) => setMeetingLink(e.target.value)}
      />
      <FormGroup>
        <FormControlLabel
          control={<Checkbox id="repeated" checked={isRepeating} onChange={(e) => setIsRepeating(!isRepeating)}/>}
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
        defaultValue={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button className={classes.root} onClick={eventSubmit}>
        Сохранить
      </Button>
    </Box>
  );
};

export default GeneralEventInfo;