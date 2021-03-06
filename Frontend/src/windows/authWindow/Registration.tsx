import { Box, Button, Modal, TextField } from "@mui/material";
import { useState } from "react";
import useButtonStyles from "../../styles/button";
import Logo from "../../assets/logo";
import { RegistrationInfoState } from "../../types/auth/registration";
import MuiPhoneNumber from "material-ui-phone-number";
import {useActions} from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import theme from "../../styles/theme";
import { modalStyle } from "../../styles/modal";

export const messageModalStyle = {
  margin: 3,
};

const registerInfoInit = {
  name: '',
  surname: '',
  email: '',
  telegramID: '',
  password: '',
  repeatPassword: '',
  phoneNumber: '',
};

const Registration = () => {
  const { register, registerEnd, selectModalPage } = useActions();
  const { isRegistered, error } = useTypedSelector(state=>state.auth.registration);
  const classes = useButtonStyles();
  const [info, setInfo] = useState<RegistrationInfoState>(registerInfoInit);

  function onSubmit() {
    register(info);
  }

  function handleClose() {
    registerEnd();
    selectModalPage("Вход");
    setInfo(registerInfoInit);
  }

  return (
    <Box>
      <Modal open={isRegistered} onClose={handleClose}>
          <Box sx={modalStyle}>
            <Box sx={messageModalStyle}>Успешная регистрация</Box>
          </Box>
      </Modal>
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
        {error && 
        <Box sx={{color: theme.palette.error.main}}>{error}</Box>}
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