import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store';
import { createMuiTheme, ThemeProvider } from './ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#262676',
    },
    secondary: {
      main: '#ff1744',
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider maxSnack={3}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </SnackbarProvider>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
