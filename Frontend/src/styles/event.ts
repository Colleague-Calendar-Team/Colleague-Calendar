import { makeStyles } from '@mui/styles';
import theme from './theme';

const useEventStyles = makeStyles({
  root: {
    position: 'absolute',
    color: theme.palette.primary.dark,
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