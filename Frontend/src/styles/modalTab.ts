import theme from '../styles/theme';
import '@mui/lab/themeAugmentation';
import { createTheme } from '@mui/material';

const themeModalTab = createTheme({
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          MuiSelected: {
            styleOverrides: {
              backgroundColor: theme.palette.primary.main,
            },
          },
        }
      }
    }
  },
});

export default themeModalTab;