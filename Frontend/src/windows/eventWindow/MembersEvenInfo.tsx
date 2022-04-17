import {useContext, useEffect, useState} from 'react';
import List from '@mui/material/List';
import theme from '../../styles/theme';
import { Box, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/search/search';
import { Button } from '@mui/material';
import useButtonStyles from "../../styles/button";
import { useActions } from '../../hooks/useActions';
import { UserProfileState } from '../../types/user';
import { GenNumbersArr } from '../../utils/genArr';
import {DEBUG_RENDER, DEBUG_REQUESTS} from "../../utils/debug";
import { render } from '@testing-library/react';
import { MembersEventInfoState } from '../../types/windows/eventWindow';
import UserElement from './../../components/users/userElement';
import dayjs from 'dayjs';
import { getProfilesByUsername } from '../../ajax/requests/profiles';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const MembersEventInfo:React.FC<MembersEventInfoState> = ({isCreate, eventID, checked, setChecked, users, setUsers, date}) => {
  const classes = useButtonStyles();
  const {selectModalPage, updateParticipants} = useActions();
  const {token} = useTypedSelector(state=>state.auth.login);
  const [username, setUsername] = useState<string>('');

  if (DEBUG_RENDER) {
    console.log('Render users info:', checked);
  }

  function Back() {
    selectModalPage('Общее');
  }

  function Next() {
    selectModalPage('Уведомления');
  }

  function onSubmit() {
    updateParticipants(token === null ? '' : token, Array.from(checked), eventID);
  }

  function searchUsers() {
    const data = getProfilesByUsername(username);
    data?.then((response) => {
      if (DEBUG_REQUESTS) {
        console.log('RESPONSE SEARCH: ');
        console.log(response.data);
      }

      const searchUsers:UserProfileState[] = response.data;
      const newUsers = users.slice(0);
      let newUsersId = 0;
      for (let i = 0; i < users.length; i++) {
        if (!checked.has(users[i].userID)) {
          newUsers.splice(newUsersId, 1);
        } else {
          newUsersId++;
        }
      }
      searchUsers.forEach((u, idx) => {
        if (!checked.has(u.userID)) {
          newUsers.push(u);
        }
      })
  
      setUsers(newUsers);
    });
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column'}}>
      <Box>
        <TextField
          id="search-input"
          label="Поиск..."
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button onClick={searchUsers} className={classes.root} sx={{ml: 1}}>Найти</Button>
      </Box>
      <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: theme.palette.primary.main, position: 'relative', overflow: 'auto', maxHeight: 300, }}>
        {users.map((user, userId) => {
          return (
            <UserElement user={user} date={date} checked={checked} setChecked={setChecked} key={userId}/>
          );
        })}
      </List>
      {isCreate ?
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1}}>
        <Button className={classes.root} onClick={Back}>
          Назад
        </Button>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button className={classes.root} onClick={Next}>Далее</Button>
        </Box>
      </Box>
        :<Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button className={classes.root} onClick={onSubmit}>Сохранить</Button>
        </Box>}
      
    </Box>
  );
};

export default MembersEventInfo;