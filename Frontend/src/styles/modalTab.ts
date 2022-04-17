import theme from '../styles/theme';
import '@mui/lab/themeAugmentation';
import { createTheme } from '@mui/material';

const themeModalTab = createTheme({
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          color: theme.palette.secondary.main,
        }
      },
    },
  },
  palette: {
    primary: {
      main: theme.palette.secondary.dark,
    },
  },
});

export default themeModalTab;