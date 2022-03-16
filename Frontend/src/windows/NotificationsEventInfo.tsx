import { useContext, useState } from "react";
import List from "@mui/material/List";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import TelegramIcon from "@mui/icons-material/Telegram";
import MessageIcon from "@mui/icons-material/Message";
import { Box, Button } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import NotificationItem from './../components/notifications/NotificationItem';
import useButtonStyles from "../styles/button";
import theme from "../styles/theme";
import GlobalContext from "../context/globalContext";

export default function NotificationsEventInfo() {
  const { setModalPage, setShowModalWindow } = useContext(GlobalContext);
  const classes = useButtonStyles();
  const [selectedNotifications, setSelectedNotifications] = useState([
    "email",
  ]);
  const [timeBeforeNtf, setTimeBeforeNtf] = useState(5);
  const timeIntervals = [5, 10, 15];

  const ntfItems = [
    { ntfName: "email", ntfLabel: "Почта" },
    { ntfName: "telegram", ntfLabel: "Телеграм" },
    { ntfName: "messages", ntfLabel: "Сообщения в телефон" },
  ];

  function Back() {
    setModalPage('Участники');
  }
  function Submit() {
    setShowModalWindow(false);
  }
  const handleChange = (event: SelectChangeEvent<number>) => {
    setTimeBeforeNtf(Number(event.target.value));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: theme.palette.primary.main,
        }}
      >
        <NotificationItem
          ntfName={ntfItems[0].ntfName}
          ntfLabel={ntfItems[0].ntfLabel}
          selectedNotifications={selectedNotifications}
          setSelectedNotifications={setSelectedNotifications}
        >
          <AlternateEmailIcon />
        </NotificationItem>
        <NotificationItem
          ntfName={ntfItems[1].ntfName}
          ntfLabel={ntfItems[1].ntfLabel}
          selectedNotifications={selectedNotifications}
          setSelectedNotifications={setSelectedNotifications}
        >
          <TelegramIcon />
        </NotificationItem>
        <NotificationItem
          ntfName={ntfItems[2].ntfName}
          ntfLabel={ntfItems[2].ntfLabel}
          selectedNotifications={selectedNotifications}
          setSelectedNotifications={setSelectedNotifications}
        >
          <MessageIcon />
        </NotificationItem>
      </List>
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <span>Напомнить мне за </span>
        <Box sx={{display: 'flex', m: 1}}>
          <FormControl>
            <Select
              id="minutes-interval-select"
              value={timeBeforeNtf}
              onChange={handleChange}
              size="small"
            >
              {timeIntervals.map((interval) =>
                <MenuItem value={interval}>{interval}</MenuItem>
              )}
            </Select>
          </FormControl>
        </Box>
        <span> минут до события</span>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button className={classes.root} onClick={Back}>
          Назад
        </Button>
        <Button className={classes.root} onClick={Submit}>Создать</Button>
      </Box>
    </Box>
  );
}
