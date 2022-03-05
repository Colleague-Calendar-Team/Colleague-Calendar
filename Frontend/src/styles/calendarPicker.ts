import theme from '../styles/theme';
import '@mui/lab/themeAugmentation';
import { createTheme } from '@mui/material';

const themeCalendarPicker = createTheme({
  palette: {
    primary: {
      dark: "#52616B",
      main: "#C9D6DF",
    },
  },
  components: {
    MuiCalendarPicker: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.primary.main,
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.primary.main,
        },
      },
    },
  },
});

export default themeCalendarPicker;