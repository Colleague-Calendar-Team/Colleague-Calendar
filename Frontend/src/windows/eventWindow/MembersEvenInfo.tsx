import {useContext, useEffect, useState} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import theme from '../../styles/theme';
import { Box, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/search/search';
import { Button } from '@mui/material';
import useButtonStyles from "../../styles/button";
import { useActions } from '../../hooks/useActions';
import { MemberState } from '../../types/members';
import { GenNumbersArr } from '../../utils/genArr';
import {DEBUG_RENDER} from "../../utils/debug";
import { render } from '@testing-library/react';
import { MembersEventInfoState } from '../../types/windows/eventWindow';
const defaultAvatar = require('../../assets/defaultAvatar.jpg');

const MembersEventInfo:React.FC<MembersEventInfoState> = ({isCreate, checked, setChecked, users, setUsers}) => {
  const classes = useButtonStyles();
  const {selectModalPage} = useActions();

  if (DEBUG_RENDER) {
    console.log('Render users info:', checked);
  }

  const handleToggle = (user: MemberState, userId: number) => () => {
    if (checked.has(user.id)) {
      const newSet = new Set(checked);
      newSet.delete(user.id);
      setChecked(newSet);
    } else {
      setChecked(new Set(checked.add(user.id)));
    }
  };

  function Back() {
    selectModalPage('Общее');
  }

  function Next() {
    selectModalPage('Уведомления');
  }

  function onSubmit() {
  }

  function searchUsers() {
    const searchUsers = [{id: 3, name: 'Родион', surname: 'Родионов'}, {id: 4, name: 'Роман', surname: 'Романов'}];
    const newUsers = users.slice(0);
    let newUsersId = 0;
    for (let i = 0; i < users.length; i++) {
      if (!checked.has(users[i].id)) {
        newUsers.splice(newUsersId, 1);
      } else {
        newUsersId++;
      }
    }
    searchUsers.forEach((u, idx) => {
      if (!checked.has(u.id)) {
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
          const labelId = `checkbox-list-secondary-label-${user}`;
          return (
            <ListItem
              key={userId}
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={handleToggle(user, userId)}
                  checked={checked.has(user.id)}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar
                    alt={`Avatar of ${user}`}
                    src={defaultAvatar}
                  />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`${user.name} ${user.surname} check: ${user.id}`} />
              </ListItemButton>
            </ListItem>
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