import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import MuiPhoneNumber from 'material-ui-phone-number';
import useButtonStyles from "../../styles/button";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { UserInfoState } from "../../types/user";
import { useActions } from "../../hooks/useActions";

const GeneralSettingsInfo = () => {
  const {updateUserProfile} = useActions();
  const {name, surname, email, telegramID, phoneNumber} = useTypedSelector(state=>state.user);
  const {token} = useTypedSelector(state=>state.auth.login);
  const [user, setUser] = useState<UserInfoState>({
    name: name,
    surname: surname,
    email: email,
    telegramID: telegramID,
    phoneNumber: phoneNumber,
  });
  const classes = useButtonStyles();

  function onSubmit() {
    updateUserProfile(token === null ? '' : token, user);
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
      <Box sx={{display: 'flex'}}>
        <TextField
          id="name"
          label="Имя"
          variant="outlined"
          size="small"
          defaultValue={user.name}
          onChange={(e) => setUser({...user, 'name': e.target.value})}
        />
        <TextField
          id="surname"
          label="Фамилия"
          variant="outlined"
          size="small"
          defaultValue={user.surname}
          onChange={(e) => setUser({...user, 'surname': e.target.value})}
          sx={{ml: 1}}
        />
      </Box>
      <TextField
        id="email"
        label="Почта"
        type="email"
        defaultValue={user.email}
        onChange={(e) => setUser({...user, 'email': e.target.value})}
        size="small"
      />
      <TextField
        id="telegram"
        label="Телеграм"
        variant="outlined"
        size="small"
        defaultValue={user.telegramID}
        onChange={(e) => setUser({...user, 'telegramID': e.target.value})}
      />
      <MuiPhoneNumber defaultCountry={'ru'} value={user.phoneNumber} onChange={(e) => {
        if (typeof(e) === 'string') {
          setUser({...user, 'phoneNumber': e})
        } else {
          setUser({...user, 'phoneNumber': e.target.value})
        }
      }}/>
      <Box sx={{ display: 'flex', justifyContent: 'end'}}>
        <Button className={classes.root} onClick={onSubmit}>
          Сохранить
        </Button>
      </Box>
    </Box>
  );
};

export default GeneralSettingsInfo;