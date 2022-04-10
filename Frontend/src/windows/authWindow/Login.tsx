import { Box, Button, TextField } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import useButtonStyles from "../../styles/button";
import Logo from "../../assets/logo";
import {useActions} from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import theme from "../../styles/theme";

const Login = () => {
  const { loginUser, getCurrentUserAccount } = useActions();
  const classes = useButtonStyles();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const {error} = useTypedSelector(state=>state.auth.login);

  function onSubmit() {
    loginUser(login, password);
  }


  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        "& > :not(style)": { m: 1, width: "80%", ml: 4 },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Logo width={80} height={80}/>
      </Box>
        <TextField
          id="login"
          label="Логин"
          variant="outlined"
          size="small"
          defaultValue={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <TextField
          id="password"
          label="Пароль"
          type="password"
          defaultValue={password}
          onChange={(e) => setPassword(e.target.value)}
          size="small"
        />
      {error && 
        <Box sx={{color: theme.palette.error.main}}>{error}</Box>}
      <Box sx={{ display: 'flex', justifyContent: 'end'}}>
        <Button className={classes.root} onClick={onSubmit}>
          Вход
        </Button>
      </Box>
    </Box>
  );
};

export default Login;