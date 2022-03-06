import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import theme from './styles/theme';
import { ThemeProvider } from '@mui/material/styles';
import ContextWrapper from './context/contextWrapper';

ReactDOM.render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
          <ContextWrapper>
            <App />
          </ContextWrapper>
      </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);