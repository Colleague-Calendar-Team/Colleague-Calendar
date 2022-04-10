import { Box, Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import useButtonStyles from "../../styles/button";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { PasswordInfoState } from "../../types/user";

const PasswordSettingsInfo = () => {
  const {updateUserPassword} = useActions();
  const {token} = useTypedSelector(state=>state.auth.login);
  const [passwordInfo, setPasswordInfo] = useState<PasswordInfoState>({
    oldPassword: '',
    newPassword: '',
    newPasswordRepeat: '',
  })

  const classes = useButtonStyles();

  function onSubmit() {
    updateUserPassword(token, passwordInfo);
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
        defaultValue={passwordInfo.oldPassword}
        onChange={(e) => setPasswordInfo({...passwordInfo, 'oldPassword': e.target.value})}
        size="small"
      />
      <TextField
        id="newPassword"
        label="Новый пароль"
        type="password"
        defaultValue={passwordInfo.newPassword}
        onChange={(e) => setPasswordInfo({...passwordInfo, 'newPassword': e.target.value})}
        size="small"
      />
      <TextField
        id="newRepeatPassword"
        label="Новый пароль повторно"
        type="password"
        defaultValue={passwordInfo.newPasswordRepeat}
        onChange={(e) => setPasswordInfo({...passwordInfo, 'newPasswordRepeat': e.target.value})}
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