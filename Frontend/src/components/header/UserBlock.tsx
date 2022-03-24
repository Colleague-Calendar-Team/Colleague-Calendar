import { useContext, useState } from 'react';
import { Box, Button, Toolbar, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import theme from '../../styles/theme';
import GlobalContext from '../../context/globalContext';
import { useTypedSelector } from '../../hooks/useTypedSelector';
const defaultAvatar = require('../../assets/defaultAvatar.jpg');

export default function UserBlock() {
  const [anchorElUser, setAnchorElUser] = useState<HTMLElement | null>(null);
  const {setShowModalWindow, setIsAuthenticated} = useContext(GlobalContext);
  const user = useTypedSelector(state=>state.user);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const openSettings = () => {
    setShowModalWindow('settings');
    setAnchorElUser(null);
  };
  const onExit = () => {
    setShowModalWindow('auth');
    setIsAuthenticated(false);
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Настройки пользователя">
        <IconButton onClick={(event) => setAnchorElUser(event.currentTarget)} sx={{ mr: 1 }}>
          <Avatar alt="Пользователь" src={defaultAvatar} sx={{borderColor: theme.palette.primary.dark, border: 2}} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', mb: 1}}>
          <IconButton sx={{ mr: 1 }}>
            <Avatar alt="Пользователь" src={defaultAvatar} sx={{borderColor: theme.palette.primary.dark, border: 2, width: 60, height: 60}} />
          </IconButton>
          <Typography textAlign="center" sx={{fontSize: 12, fontWeight: 'bold'}}>{user.name} {user.surname}</Typography>
          <Typography textAlign="center" sx={{fontSize: 12}}>{user.email}</Typography>
        </Box>
        <MenuItem key={0} onClick={openSettings}>
          <Typography textAlign="center">Настройки</Typography>
        </MenuItem>
        <MenuItem key={1} onClick={onExit}>
          <Typography textAlign="center">Выход</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
