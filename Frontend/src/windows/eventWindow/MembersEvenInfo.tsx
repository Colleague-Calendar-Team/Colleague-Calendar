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
import {DEBUG_RENDER} from "../../utils/debug";
import { render } from '@testing-library/react';
import { MembersEventInfoState } from '../../types/windows/eventWindow';
import UserElement from './../../components/users/userElement';
import dayjs from 'dayjs';

const MembersEventInfo:React.FC<MembersEventInfoState> = ({isCreate, checked, setChecked, users, setUsers, date}) => {
  const classes = useButtonStyles();
  const {selectModalPage} = useActions();

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
  }

  function searchUsers() {
    const searchUsers = [{userID: 3, name: 'Родион', surname: 'Родионов'}, {userID: 4, name: 'Роман', surname: 'Романов'}];
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