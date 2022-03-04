import { makeStyles } from '@mui/styles';
import theme from './theme';

const useButtonStyles = makeStyles({
  root: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.secondary.main,
    padding: '5 10px',
    textTransform: 'none',
    '&:hover': { 
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.light,
    },
  },
});

export default useButtonStyles;