import { useContext, useState } from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import dayjs from 'dayjs';
import Logo from '../../assets/logo';
import useButtonStyles from '../../styles/button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GlobalContext from '../../context/globalContext';
import { WeekElementState } from '../../types/elements/weekElement';
import theme from '../../styles/theme';

const Header:React.FC<WeekElementState> = ({week}) => {
  const classes = useButtonStyles();
  const {daySelected, setDaySelected, setShowModalWindow} = useContext(GlobalContext);
  const firstDate = dayjs(new Date(week[0].year(), week[0].month()));
  const secondDate = dayjs(new Date(week[6].year(), week[6].month()));
  const [anchorElUser, setAnchorElUser] = useState<HTMLElement | null>(null);

  function clickPrevWeek() {
    setDaySelected(dayjs(new Date(week[0].year(), week[0].month(), week[0].date() - 7)));
  };
  function clickNextWeek() {
    setDaySelected(dayjs(new Date(week[0].year(), week[0].month(), week[0].date() + 7)));
  };
  function clickToday() {
    setDaySelected(daySelected === dayjs() ? daySelected : dayjs());
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const openSettings = () => {
    setShowModalWindow('settings');
    setAnchorElUser(null);
  };
  const onExit = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Toolbar disableGutters>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', alignItems: 'center' }, pl: 1 }}>
          <Logo width={40} height={40}/>
          <Typography variant="h6" component="h2" sx={{m: 1}}>
              Colleague Calendar
          </Typography>
          <Button className={classes.root} onClick={clickToday}>Сегодня</Button>
          <ChevronLeftIcon onClick={clickPrevWeek}/>
            <Typography variant="h6" component="h2" sx={{m: 1}}>
              {firstDate.format("MMMM")}
              {week[0].year() !== week[6].year() && firstDate.format(" YYYY")}
              {week[0].month() !== week[6].month() && secondDate.format(" - MMMM")}
              {secondDate.format(" YYYY ")}
              {week[0].date()} - {week[6].date()}
            </Typography>
          <ChevronRightIcon onClick={clickNextWeek}/>
        </Box>
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Настройки пользователя">
              <IconButton onClick={(event) => setAnchorElUser(event.currentTarget)} sx={{ mr: 1 }}>
                <Avatar alt="Пользователь" src="/defaultAvatar.jpg" sx={{borderColor: theme.palette.primary.dark, border: 2}} />
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
                  <Avatar alt="Пользователь" src="/defaultAvatar.jpg" sx={{borderColor: theme.palette.primary.dark, border: 2, width: 60, height: 60}} />
                </IconButton>
                <Typography textAlign="center" sx={{fontSize: 12, fontWeight: 'bold'}}>Иван Иванов</Typography>
                <Typography textAlign="center" sx={{fontSize: 12}}>ivanov@mail.ru</Typography>
              </Box>
              <MenuItem key={0} onClick={openSettings}>
                <Typography textAlign="center">Настройки</Typography>
              </MenuItem>
              <MenuItem key={1} onClick={onExit}>
                <Typography textAlign="center">Выход</Typography>
              </MenuItem>
            </Menu>
          </Box>
      </Toolbar>
  </AppBar>
  )
}

export default Header;