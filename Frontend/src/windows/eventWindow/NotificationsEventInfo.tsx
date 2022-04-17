import { useContext, useState } from "react";
import List from "@mui/material/List";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import TelegramIcon from "@mui/icons-material/Telegram";
import MessageIcon from "@mui/icons-material/Message";
import { Box, Button } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import NotificationElement from '../../components/notifications/NotificationElement';
import useButtonStyles from "../../styles/button";
import theme from "../../styles/theme";
import { useActions } from "../../hooks/useActions";
import { NotificationsEventInfoState } from "../../types/windows/eventWindow";
import { useNavigate } from "react-router-dom";

export const NotificationsEventInfo:React.FC<NotificationsEventInfoState> = ({isCreate, eventID, notifications, setNotifications, onCreate}) => {
  const {selectModalPage, selectModalWindow} = useActions();
  const navigate = useNavigate();
  const classes = useButtonStyles();
  const timeIntervals = [5, 10, 15];

  const ntfItems = [
    { ntfName: "notificationInEmail", ntfLabel: "Почта" },
    { ntfName: "notificationInTelegram", ntfLabel: "Телеграм" },
    { ntfName: "notificationInSMS", ntfLabel: "Сообщения в телефон" },
  ];

  function Back() {
    selectModalPage('Участники');
  }
  function onSubmit() {
    navigate('/');
  }
  const handleChange = (event: SelectChangeEvent<number>) => {
    setNotifications({ ...notifications, notificationTime : Number(event.target.value) })
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
        <NotificationElement
          ntfName={ntfItems[0].ntfName}
          ntfLabel={ntfItems[0].ntfLabel}
          notification={notifications.notificationInEmail}
          setNotification={() => setNotifications({ ...notifications, notificationInEmail: !notifications.notificationInEmail })}
        >
          <AlternateEmailIcon />
        </NotificationElement>
        <NotificationElement
          ntfName={ntfItems[1].ntfName}
          ntfLabel={ntfItems[1].ntfLabel}
          notification={notifications.notificationInTelegram}
          setNotification={() => setNotifications({ ...notifications, notificationInTelegram: !notifications.notificationInTelegram })}
        >
          <TelegramIcon />
        </NotificationElement>
        <NotificationElement
          ntfName={ntfItems[2].ntfName}
          ntfLabel={ntfItems[2].ntfLabel}
          notification={notifications.notificationInSMS}
          setNotification={() => setNotifications({ ...notifications, notificationInSMS: !notifications.notificationInSMS })}
        >
          <MessageIcon />
        </NotificationElement>
      </List>
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <span>Напомнить мне за </span>
        <Box sx={{display: 'flex', m: 1}}>
          <FormControl>
            <Select
              id="minutes-interval-select"
              value={notifications.notificationTime}
              onChange={handleChange}
              size="small"
            >
              {timeIntervals.map((interval, id) =>
                <MenuItem value={interval} key={id}>{interval}</MenuItem>
              )}
            </Select>
          </FormControl>
        </Box>
        <span> минут до события</span>
      </Box>
      {isCreate ?
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1}}>
        <Button className={classes.root} onClick={Back}>
          Назад
        </Button>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button className={classes.root} onClick={onCreate}>Создать</Button>
        </Box>
      </Box>
        :<Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button className={classes.root} onClick={onSubmit}>Сохранить</Button>
        </Box>}
    </Box>
  );
}
