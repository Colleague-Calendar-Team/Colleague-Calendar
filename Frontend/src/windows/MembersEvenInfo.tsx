import {useContext, useState} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import theme from '../styles/theme';
import { Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from '../components/search/search';
import { Button } from '@mui/material';
import useButtonStyles from "../styles/button";
import GlobalContext from "../context/globalContext";

const MembersEventInfo = () => {
  const classes = useButtonStyles();
  const { setModalPage } = useContext(GlobalContext);
  const [checked, setChecked] = useState([1]);
  const [users, setUsers] = useState(['Иван Иванов', 'Рафаэль Петров', 'Роберт Иванов', 'Родион Романов', 'Роман Петров', 'Роза Иванова', 'Петр Петров']);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const handleToggle = (user: string, userId: number) => () => {
    const currentIndex = checked.indexOf(userId);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(userId);
      selectedUsers.push(user);
    } else {
      newChecked.splice(currentIndex, 1);
      selectedUsers.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  function Back() {
    setModalPage('Общее');
  }

  function Next() {
    setModalPage('Уведомления');
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column'}}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search>
      <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: theme.palette.primary.main, position: 'relative', overflow: 'auto', maxHeight: 300, }}>
        {users.map((user, userId) => {
          const labelId = `checkbox-list-secondary-label-${user}`;
          return (
            <ListItem
              key={user}
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={handleToggle(user, userId)}
                  checked={checked.indexOf(userId) !== -1}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar
                    alt={`Avatar of ${user}`}
                    src={`defaultAvatar.jpg`}
                  />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`${user}`} />
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