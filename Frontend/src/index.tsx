import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import theme from './styles/theme';
import { ThemeProvider } from '@mui/material/styles';
import ContextWrapper from './context/contextWrapper';
import { Provider } from 'react-redux';
import {store} from './store';

ReactDOM.render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
          <ContextWrapper>
            <Provider store={store}>
              <App />
            </Provider>
          </ContextWrapper>
      </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);