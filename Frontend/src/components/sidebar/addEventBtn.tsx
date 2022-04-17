import { Button, Typography } from '@mui/material';
import useButtonStyles from '../../styles/button';
import { useActions } from "../../hooks/useActions";
import { EventInit } from '../../types/event/eventInit';
import { useNavigate } from 'react-router-dom';

export default function AddEventBtn() {
  const classes = useButtonStyles();
  const { selectModalWindow, selectEvent } = useActions();
  const navigate = useNavigate();
  
  return (
    <Button onClick={()=> {
      selectEvent(EventInit({}));
      selectModalWindow('eventCreate');
      navigate('/events/add');
    }} className={classes.root} sx={{ml:1}}>
      Создать мероприятие
    </Button>
  );
}