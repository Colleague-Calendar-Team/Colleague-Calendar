import { Button, Typography } from '@mui/material';
import useButtonStyles from '../../styles/button';
import { useActions } from "../../hooks/useActions";
import { EventInit } from '../../types/event/eventInit';

export default function AddEventBtn() {
  const classes = useButtonStyles();
  const { selectModalWindow, selectEvent } = useActions();
  
  return (
    <Button onClick={()=> {
      selectEvent(EventInit({}));
      selectModalWindow('eventCreate');
    }} className={classes.root} sx={{ml:1}}>
      Создать мероприятие
    </Button>
  );
}