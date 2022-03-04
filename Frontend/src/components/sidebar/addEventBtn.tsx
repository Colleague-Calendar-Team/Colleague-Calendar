import { Button, Typography } from '@mui/material';
import useButtonStyles from '../../styles/button';

export default function AddEventBtn() {
  const classes = useButtonStyles();
  
  return (
    <Button className={classes.root}>
      <Typography  sx={{textAlign: 'center', fontSize: 12}}>
          Создать мероприятие
      </Typography>
    </Button>
  );
}