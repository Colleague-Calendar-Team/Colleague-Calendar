import { Box, Button, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import GlobalContext from "../../context/globalContext";
import useButtonStyles from "../../styles/button";
import theme from "../../styles/theme";
import Avatar from '@mui/material/Avatar';
import { useTypedSelector } from "../../hooks/useTypedSelector";

const AvatarSettingsInfo = () => {
  const [avatarUrl, setAvatarUrl] = useState("defaultAvatar.jpg");
  const classes = useButtonStyles();
  const user = useTypedSelector(state=>state.user);

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
      <Typography>Текущий аватар: {avatarUrl}</Typography>
      <TextField
        id="avatar"
        type="file"
        onChange={(e) => setAvatarUrl(e.target.value)}
        size="small"
      />
      <Box><Avatar alt="Пользователь" src={avatarUrl} sx={{borderColor: theme.palette.primary.dark, border: 2, width: 80, height: 80}} /></Box>
      <Box sx={{ display: 'flex', justifyContent: 'end'}}>
        <Button className={classes.root} onClick={onSubmit}>
          Сохранить
        </Button>
      </Box>
    </Box>
  );
};

export default AvatarSettingsInfo;