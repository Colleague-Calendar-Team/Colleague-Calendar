import { memo } from 'react';
import { Box } from '@mui/material';
import AddEventBtn from './addEventBtn';

import NavigateCalendar from './NavigateCalendar';
import { DEBUG_RENDER } from '../../utils/debug';

export default memo(function Sidebar() {
  if (DEBUG_RENDER) {
    console.log('render sidebar (+memo)');
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column'}}>
      <Box sx={{ display: 'flex'}}>
        <AddEventBtn/>
      </Box>
      <NavigateCalendar/>
    </Box>
  )
});
