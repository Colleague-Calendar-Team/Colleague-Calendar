import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      dark: "#1E2022",
      main: "#F0F5F9",
      light: "#C9D6DF",
    },
    secondary: {
      main: "#52616B",
    },
    error: {
      main: "#EAA9A9",
    },
  },
});

export default theme;