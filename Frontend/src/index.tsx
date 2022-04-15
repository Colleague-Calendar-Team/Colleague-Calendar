import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import theme from './styles/theme';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import {store} from './store';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
          <Provider store={store}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </Provider>
      </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);