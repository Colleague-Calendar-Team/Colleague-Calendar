import { Box, Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import GlobalContext from "../../context/globalContext";
import useButtonStyles from "../../styles/button";

const PasswordSettingsInfo = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRepeatPassword, setNewRepeatPassword] = useState('');

  const classes = useButtonStyles();

  function onSubmit() {
  }

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "95%" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="oldPassword"
        label="Старый пароль"
        type="password"
        defaultValue={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        size="small"
      />
      <TextField
        id="newPassword"
        label="Новый пароль"
        type="password"
        defaultValue={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        size="small"
      />
      <TextField
        id="newRepeatPassword"
        label="Новый пароль повторно"
        type="password"
        defaultValue={newRepeatPassword}
        onChange={(e) => setNewRepeatPassword(e.target.value)}
        size="small"
      />
      <Box sx={{ display: 'flex', justifyContent: 'end'}}>
        <Button className={classes.root} onClick={onSubmit}>
          Сохранить
        </Button>
      </Box>
    </Box>
  );
};

export default PasswordSettingsInfo;