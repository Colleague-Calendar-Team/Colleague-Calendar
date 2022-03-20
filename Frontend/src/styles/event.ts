import { makeStyles } from '@mui/styles';
import theme from './theme';

const useEventStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'absolute',
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.primary.light,
    width: '100%',
    zIndex: 1,
    borderRadius: 4,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.main,
    }
  },
});

export default useEventStyles;