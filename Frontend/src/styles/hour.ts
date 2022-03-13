import { makeStyles } from '@mui/styles';
import theme from './theme';

const useHourStyles = makeStyles({
  root: {
    position: 'relative',
    height: '3em',
    cursor: 'pointer',
    textAlign: "center",
    borderColor: theme.palette.primary.dark,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    }
  },
});

export default useHourStyles;

