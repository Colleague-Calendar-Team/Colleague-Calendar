import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Switch from "@mui/material/Switch";
import { NotificationElementState } from "../../types/elements/notificationElement";

const NotificationElement: React.FC<NotificationElementState> = ({
  ntfName,
  ntfLabel,
  notification,
  setNotification,
  children,
}) => {
  return (
    <ListItem>
      <ListItemIcon>{children}</ListItemIcon>
      <ListItemText
        id={`switch-list-label-{${ntfName}}`}
        primary={`${ntfLabel}`}
      />
      <Switch
        edge="end"
        onChange={setNotification}
        checked={notification}
        inputProps={{
          "aria-labelledby": `switch-list-label-{${ntfName}}`,
        }}
      />
    </ListItem>
  );
};

export default NotificationElement;