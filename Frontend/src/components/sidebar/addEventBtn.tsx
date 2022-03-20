import { Button, Typography } from '@mui/material';
import { useContext } from 'react';
import GlobalContext from '../../context/globalContext';
import useButtonStyles from '../../styles/button';

export default function AddEventBtn() {
  const classes = useButtonStyles();
  const {setShowModalWindow} = useContext(GlobalContext);
  
  return (
    <Button onClick={()=> setShowModalWindow('event')} className={classes.root} sx={{ml:1}}>
      Создать мероприятие
    </Button>
  );
}