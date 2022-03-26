import { Box, Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import useButtonStyles from "../../styles/button";
import Logo from "../../assets/logo";
import { RegistrationInfo } from "../../types/registrationInfo";
import MuiPhoneNumber from "material-ui-phone-number";
import {useActions} from "../../hooks/useActions";

const Registration = () => {
  const { authUser } = useActions();
  const classes = useButtonStyles();
  const [info, setInfo] = useState<RegistrationInfo>({
    name: '',
    surname: '',
    email: '',
    telegramID: '',
    password: '',
    repeatPassword: '',
    phoneNumber: '',
  });

  function onSubmit() {
    authUser(true);
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2}}>
        <Logo width={80} height={80}/>
      </Box>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          "& > :not(style)": { m: 1, width: "80%", ml: 4 },
        }}
      >
        <Box sx={{display: 'flex'}}>
          <TextField
            id="name"
            label="Имя"
            variant="outlined"
            size="small"
            defaultValue={info.name}
            onChange={(e) => setInfo({...info, 'name': e.target.value})}
          />
          <TextField
            id="surname"
            label="Фамилия"
            variant="outlined"
            size="small"
            defaultValue={info.surname}
            onChange={(e) => setInfo({...info, 'surname': e.target.value})}
            sx={{ml: 1}}
          />
        </Box>
        <TextField
          id="email"
          label="Почта"
          type="email"
          defaultValue={info.email}
          onChange={(e) => setInfo({...info, 'email': e.target.value})}
          size="small"
        />
        <TextField
          id="telegram"
          label="Телеграм"
          variant="outlined"
          size="small"
          defaultValue={info.telegramID}
          onChange={(e) => setInfo({...info, 'telegramID': e.target.value})}
        />
        <TextField
          id="password"
          label="Пароль"
          type="password"
          defaultValue={info.password}
          onChange={(e) => setInfo({...info, 'password': e.target.value})}
          size="small"
        />
        <TextField
          id="repeatPassword"
          label="Пароль повторно"
          type="password"
          defaultValue={info.repeatPassword}
          onChange={(e) => setInfo({...info, 'repeatPassword': e.target.value})}
          size="small"
        />
        <MuiPhoneNumber defaultCountry={'ru'} value={info.phoneNumber} onChange={(e) => {
          if (typeof(e) === 'string') {
            setInfo({...info, 'phoneNumber': e})
          } else {
            setInfo({...info, 'phoneNumber': e.target.value})
          }
        }}/>
        <Box sx={{ display: 'flex', justifyContent: 'end'}}>
          <Button className={classes.root} onClick={onSubmit}>
            Регистрация
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Registration;