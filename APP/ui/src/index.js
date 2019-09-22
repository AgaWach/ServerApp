import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: blueGrey,
    secondary: {
      main: '#37474f',
    }
  }
})

ReactDOM.render (
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
)
