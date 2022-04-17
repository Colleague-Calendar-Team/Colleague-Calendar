import { alpha, styled } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import theme from '../../styles/theme';

export const Search = styled('div')(() => ({
  position: 'relative',
  borderRadius: 4,
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.secondary.main,
  width: '100%',
}));

export const SearchIconWrapper = styled('div')(() => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(() => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    // transition: theme.transitions.create('width'),
  },
}));