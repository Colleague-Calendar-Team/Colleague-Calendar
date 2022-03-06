import { Box, TextField } from "@mui/material";
import React, { useContext } from "react";
import ModalWindow from "../components/modal/Modal";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import dayjs from "dayjs";
import GlobalContext from "../context/globalContext";

const GeneralEventInfo = () => {
  const {daySelected} = useContext(GlobalContext);

  return  <Box
  component="form"
  sx={{
    '& > :not(style)': { m: 1, width: '90%' },
  }}
  noValidate
  autoComplete="off"
>
  <TextField id="title" label="Название мероприятия" variant="outlined" size="small"/>
  <TextField
    id="date-begin"
    label="Дата и время начала"
    type="datetime-local"
    defaultValue={dayjs(daySelected).format('YYYY-MM-DDTHH:MM')}
    size="small"
  />
  <TextField
    id="date-end"
    label="Дата и время окончания"
    type="datetime-local"
    defaultValue={dayjs(daySelected).format('YYYY-MM-DDTHH:MM')}
    size="small"
  />
  <TextField id="location" label="Местоположение" variant="outlined" size="small"/>
  <FormGroup>
    <FormControlLabel control={<Checkbox id='repeated'/>} label="Повторяющееся мероприятие"/>
  </FormGroup>
  <TextField id="description" label="Описание" variant="outlined" multiline maxRows={4} size="small"/>
  </Box> 
};

const MembersEventInfo = () => {
  return <div>Участники</div>;
};

const NotificationsEventInfo = () => {
  return <div>Уведомления</div>;
};

export default function EventWindow() {
  return (
    <ModalWindow
      title="Создание мероприятия"
      pagesNames={["Общее", "Участники", "Уведомления"]}
      // pagesContent={[
      //   GeneralEventInfo, MembersEventInfo, NotificationsEventInfo
      // ]}
    >
      <GeneralEventInfo/>
      <MembersEventInfo/>
      <NotificationsEventInfo/>
    </ModalWindow>
  );
}
