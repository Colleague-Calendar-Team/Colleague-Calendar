import { useContext, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import TelegramIcon from "@mui/icons-material/Telegram";
import MessageIcon from "@mui/icons-material/Message";
import Switch from "@mui/material/Switch";
import { Box, Button } from "@mui/material";
import useButtonStyles from "../styles/button";
import theme from "../styles/theme";
import { NotificationItemState } from "../types/notificationItem";
import GlobalContext from "../context/globalContext";

const NotificationItem: React.FC<NotificationItemState> = ({
  ntfName,
  ntfLabel,
  selectedNotifications,
  setSelectedNotifications,
  children,
}) => {
  const handleToggle = (value: string) => () => {
    const currentIndex = selectedNotifications.indexOf(value);
    const newChecked = [...selectedNotifications];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSelectedNotifications(newChecked);
  };

  return (
    <ListItem>
      <ListItemIcon>{children}</ListItemIcon>
      <ListItemText
        id={`switch-list-label-{${ntfName}}`}
        primary={`${ntfLabel}`}
      />
      <Switch
        edge="end"
        onChange={handleToggle(ntfName)}
        checked={selectedNotifications.indexOf(ntfName) !== -1}
        inputProps={{
          "aria-labelledby": `switch-list-label-{${ntfName}}`,
        }}
      />
    </ListItem>
  );
};

export default function NotificationsEventInfo() {
  const { setModalPage, setShowModalWindow } = useContext(GlobalContext);
  const classes = useButtonStyles();
  const [selectedNotifications, setSelectedNotifications] = useState([
    "email",
  ]);
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
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button className={classes.root} onClick={Back}>
          Назад
        </Button>
        <Button className={classes.root} onClick={Submit}>Создать</Button>
      </Box>
    </Box>
  );
}
