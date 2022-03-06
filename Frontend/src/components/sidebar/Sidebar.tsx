import { Box } from '@mui/material';
import AddEventBtn from './AddEventBtn';

import NavigateCalendar from './NavigateCalendar';

export default function Sidebar() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column'}}>
      <Box sx={{ display: 'flex'}}>
        <AddEventBtn/>
      </Box>
      <NavigateCalendar/>
    </Box>
  )
}
