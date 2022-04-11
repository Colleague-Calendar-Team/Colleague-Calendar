import { Box, Button, TextField, Typography } from "@mui/material";
import { ChangeEvent, ChangeEventHandler, useContext, useState } from "react";
import useButtonStyles from "../../styles/button";
import theme from "../../styles/theme";
import Avatar from '@mui/material/Avatar';
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { DEBUG_COMPONENTS } from "../../utils/debug";
const defaultAvatar = require('../../assets/defaultAvatar.jpg');

const AvatarSettingsInfo = () => {
  const classes = useButtonStyles();
  const {avatarUrl} = useTypedSelector(state=>state.user);
  const {saveAvatar} = useActions();
  const [avatar, setAvatar] = useState<string>(avatarUrl || defaultAvatar);

  function onSubmit() {
    if (avatar) {
      saveAvatar(avatar);
    }
  }

  function onSelectAvatar(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | UIEvent & { target: HTMLInputElement & { files: Array<string>}}) {
    if (e.target instanceof HTMLInputElement) {
      if (e.target?.files?.length) {
        if (DEBUG_COMPONENTS) { 
          console.log("avatar:", URL.createObjectURL(e.target.files[0]))
        }
        
        setAvatar(URL.createObjectURL(e.target.files[0]));
      }
    }
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
      {avatarUrl}
      <Typography>Текущий аватар: {avatar || defaultAvatar}</Typography>
      <TextField
        id="avatar"
        type="file"
        onChange={onSelectAvatar}
        size="small"
      />
      <Box><Avatar alt="Пользователь" src={avatar || defaultAvatar} sx={{borderColor: theme.palette.primary.dark, border: 2, width: 80, height: 80}} /></Box>
      <Box sx={{ display: 'flex', justifyContent: 'end'}}>
        <Button className={classes.root} onClick={onSubmit}>
          Сохранить
        </Button>
      </Box>
    </Box>
  );
};

export default AvatarSettingsInfo;