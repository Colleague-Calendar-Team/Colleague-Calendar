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
const defaultAvatar = require('../../assets/defaultAvatar.jpg');

const MembersEventInfo = () => {
  const classes = useButtonStyles();
  const {selectModalPage} = useActions();
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [users, setUsers] = useState<MemberState[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<MemberState[]>([]);

  if (DEBUG_RENDER) {
    console.log('Render users info:', checked);
  }

  useEffect(() => {
    const users = [{id: 1, name: 'Иван', surname: 'Иванов'}, {id: 2, name: 'Петр', surname: 'Петров'}];
    setSelectedUsers(users);
    setUsers(users);
  }, []);

  useEffect(() => {
    const newChecked = checked;
    selectedUsers.forEach((user) => {
      newChecked.add(user.id);
    })
    setChecked(newChecked);
    console.log('set checked:', checked);
  }, [selectedUsers]);

  const handleToggle = (user: MemberState, userId: number) => () => {
    if (checked.has(user.id)) {
      const newSet = checked;
      newSet.delete(user.id);

      setChecked(newSet);
      // selectedUsers.forEach((u, index) =>{
      //   if (u.id === user.id) {
      //     selectedUsers.splice(index, 1);
      //   }
      // });
    } else {
      setSelectedUsers(users);
      // setChecked(checked.add(user.id));
      // selectedUsers.push(user);
    }
    
    // console.log("toggle")
    // const currentIndex = checked.indexOf(userId);
    // const newChecked = [...checked];

    // if (currentIndex === -1) {
    //   newChecked.push(userId);
    //   selectedUsers.push(user);
    // } else {
    //   newChecked.splice(currentIndex, 1);
    //   selectedUsers.splice(currentIndex, 1);
    // }

    // setChecked(newChecked);
    console.log("checked:", checked);
  };

  function Back() {
    selectModalPage('Общее');
  }

  function Next() {
    selectModalPage('Уведомления');
  }

  function searchUsers() {
    const searchUsers = [{id: 3, name: 'Родион', surname: 'Родионов'}, {id: 4, name: 'Роман', surname: 'Романов'}];
    // setSelectedUsers(selectedUsers.concat(searchUsers));
    setUsers(selectedUsers.concat(searchUsers));
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column'}}>
      {checked}
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
                <ListItemText id={labelId} primary={`${user.name} ${user.surname}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1}}>
        <Button className={classes.root} onClick={Back}>
          Назад
        </Button>
        <Button className={classes.root} onClick={Next}>
          Далее
        </Button>
      </Box>
    </Box>
  );
};

export default MembersEventInfo;