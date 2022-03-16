import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Switch from "@mui/material/Switch";
import { NotificationElementState } from "../../types/elements/notificationElement";

const NotificationElement: React.FC<NotificationElementState> = ({
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

export default NotificationElement;