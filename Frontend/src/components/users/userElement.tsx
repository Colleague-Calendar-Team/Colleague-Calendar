import {ChangeEvent, MouseEvent, useState} from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Button from '@mui/material/Button';
import {Box} from '@mui/material';
import { UserElementState } from '../../types/elements/userElements';
import { UserProfileState } from '../../types/user';
import dayjs from 'dayjs';
import { UserWorkloadInnerState } from '../../types/workload';
import theme from '../../styles/theme';
import { WorkloadToArrOfWidth } from './workloadWidths';
import { getUserWorkload } from '../../ajax/requests/workload';
import { DEBUG_REQUESTS } from '../../utils/debug';

const defaultAvatar = require('../../assets/defaultAvatar.jpg');

const UserElement:React.FC<UserElementState> = ({user, date, checked, setChecked}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [workload, setWorkload] = useState<number[]>([]);
  const [workloadDay, setWorkloadDay] = useState<dayjs.Dayjs>(dayjs(date));
  const hoursLabels = [0, 4, 8, 12, 16, 20];

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);

    if (!workload.length) {
      const data = getUserWorkload(workloadDay, user.userID, 'token');
      data?.then((response) => {
        if (DEBUG_REQUESTS) {
          console.log('RESPONSE WORKLOAD: ');
          console.log(response.data);
          // console.log(JSON.parse(response.data));
        }

        const workloads:UserWorkloadInnerState[] = response.data;
        setWorkload(WorkloadToArrOfWidth(workloads));
      });
    }
  };

  function getWorkloadElemStyle(prevElem: number, curElem: number, wId: number) {
    return {
      width: prevElem ? `${curElem - prevElem}%` : `${curElem}%`,
      height: '2em',
      backgroundColor: wId % 2 === 0 ? theme.palette.primary.main : theme.palette.error.main,
    };
  }

  function getLabelPos(length: number) {
    return {
      width: `${100/length}%`,
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      pl: '0.2em',
    };
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggle = (user: UserProfileState) => () => {
    if (checked.has(user.userID)) {
      const newSet = new Set(checked);
      newSet.delete(user.userID);
      setChecked(newSet);
    } else {
      setChecked(new Set(checked.add(user.userID)));
    }
  };

  function clickPrevDay() {
    setWorkloadDay(dayjs(new Date(workloadDay.year(), workloadDay.month(), workloadDay.date() - 1)));
  };
  function clickNextDay() {
    setWorkloadDay(dayjs(new Date(workloadDay.year(), workloadDay.month(), workloadDay.date() + 1)));
  };

  const open = Boolean(anchorEl);

  return (
    <ListItem
      secondaryAction={
        <Checkbox
          edge="end"
          onChange={handleToggle(user)}
          checked={checked.has(user.userID)}
        />
      }
      disablePadding
    >
      <ListItemButton onClick={(e) => handleClick(e)}>
        <ListItemAvatar>
          <Avatar
            alt={`Avatar of ${user}`}
            src={defaultAvatar}
          />
        </ListItemAvatar>
        <ListItemText>{user.userID}: {user.name} {user.surname}</ListItemText>
      </ListItemButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ p: 1, backgroundColor: theme.palette.primary.dark, color: theme.palette.primary.main}}>
              {user.name} {user.surname}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', p: 1, backgroundColor: theme.palette.primary.dark, color: theme.palette.primary.main}}>
              <ChevronLeftIcon onClick={clickPrevDay}/>
                {workloadDay.format('DD.MM.YYYY')}
              <ChevronRightIcon onClick={clickNextDay}/>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', position: 'relative', width: '100%'}}>
            {workload.length > 0 &&
              workload.map((_, wId)=>
                <Box key={wId} sx={getWorkloadElemStyle(workload[wId - 1], workload[wId], wId)}></Box>
              )
            }
            <Box sx={{ display: 'flex', position: 'absolute', width: '100%', height: '100%'}}>
              {hoursLabels.map((label, lId) => {
                return <Box sx={getLabelPos(hoursLabels.length)} key={lId}>{label}</Box>
              })}
            </Box>
          </Box>
        </Box>
      </Popover>
    </ListItem>
  );
}

export default UserElement;