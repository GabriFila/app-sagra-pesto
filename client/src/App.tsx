import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  createMuiTheme,
  ThemeOptions,
  ThemeProvider
} from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import green from '@material-ui/core/colors/green';
import CssBaseline from '@material-ui/core/CssBaseline';
import AuthProvider from './context/AuthContext';
import Menu from './components/TopBar';
import Routes from './Routes';

const baseThemeConfig: ThemeOptions = {
  palette: {
    primary: green,
    secondary: orange
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          'scroll-behavior': 'smooth'
        },
        a: {
          textDecoration: 'none',
          color: 'black'
        },
        '*::-webkit-scrollbar': {
          width: '4px'
        },
        '*::-webkit-scrollbar-thumb': {
          borderRadius: 10,
          backgroundColor: green[400]
        },
        'input::-webkit-inner-spin-button': {
          '-webkit-appearance': 'none',
          margin: 0
        },
        'input[type=number]': {
          '-moz-appearance': 'textfield'
        }
      }
    }
  }
};

const lightTheme = createMuiTheme(baseThemeConfig);
const darkThemeConfig = { ...baseThemeConfig };
darkThemeConfig.palette.type = 'dark';
const darkTheme = createMuiTheme(darkThemeConfig);

function App() {
  const [isLightTheme, setIsLightTheme] = useState(() => {
    const isLastThemeLight = localStorage.getItem('isLastThemeLight');
    console.log(isLastThemeLight);
    console.log(isLastThemeLight === undefined);
    console.log(Boolean(isLastThemeLight));
    return isLastThemeLight === undefined
      ? true
      : isLastThemeLight === 'true'
      ? true
      : false;
  });

  return (
    <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Menu isLightTheme={isLightTheme} setIsLigthTheme={setIsLightTheme}>
            <Routes />
          </Menu>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
