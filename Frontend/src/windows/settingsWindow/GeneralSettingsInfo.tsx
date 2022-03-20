import { Box, Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import MuiPhoneNumber from 'material-ui-phone-number';
import GlobalContext from "../../context/globalContext";
import useButtonStyles from "../../styles/button";

const GeneralSettingsInfo = () => {
  const [name, setName] = useState("Неизвестно");
  const [surname, setSurname] = useState("Неизвестно");
  const [email, setEmail] = useState("unknown@mail.ru");
  const [telegram, setTelegram] = useState("unknown");
  const [phoneNumber, setPhoneNumber] = useState("+79161234567");

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
      <Box sx={{display: 'flex'}}>
        <TextField
          id="name"
          label="Имя"
          variant="outlined"
          size="small"
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="surname"
          label="Фамилия"
          variant="outlined"
          size="small"
          defaultValue={surname}
          onChange={(e) => setSurname(e.target.value)}
          sx={{ml: 1}}
        />
      </Box>
      <TextField
        id="email"
        label="Почта"
        type="email"
        defaultValue={email}
        onChange={(e) => setEmail(e.target.value)}
        size="small"
      />
      <TextField
        id="telegram"
        label="Телеграм"
        variant="outlined"
        size="small"
        defaultValue={telegram}
        onChange={(e) => setTelegram(e.target.value)}
      />
      <TextField
        id="phoneNumber"
        label="Номер телефона"
        variant="outlined"
        size="small"
        defaultValue={phoneNumber}
        onChange={(e) => setTelegram(e.target.value)}
      />
      <MuiPhoneNumber defaultCountry={'ru'} onChange={(e) => {
        if (typeof(e) === 'string') {
          setPhoneNumber(e);
        } else {
          setPhoneNumber(e.target.value);
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