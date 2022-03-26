import { Button, Typography } from '@mui/material';
import useButtonStyles from '../../styles/button';
import { useActions } from "../../hooks/useActions";

export default function AddEventBtn() {
  const classes = useButtonStyles();
  const { selectModalWindow } = useActions();
  
  return (
    <Button onClick={()=> selectModalWindow('event')} className={classes.root} sx={{ml:1}}>
      Создать мероприятие
    </Button>
  );
}