import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import {
  createMuiTheme,
  ThemeOptions,
  ThemeProvider
} from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import green from '@material-ui/core/colors/green';
import CssBaseline from '@material-ui/core/CssBaseline';
import PrivateRoleRoute from './components/PrivateRoleRoute';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import AdminPage from './components/admin/AdminPage';
import AuthProvider from './context/AuthContext';
import Menu from './components/TopBar';
import CashRegisterPage from './components/cashRegister/CashRegisterPage';
import InstantCashRegisterPage from './components/instantCashRegister/InstantCashRegisterPage';

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
  const [isLightTheme, setIsLightTheme] = useState(true);

  return (
    <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Menu isLightTheme={isLightTheme} setIsLigthTheme={setIsLightTheme}>
            <Switch>
              <PrivateRoleRoute
                requiredRoles={[]}
                exact
                path="/"
                component={HomePage}
              />
              <PrivateRoleRoute
                requiredRoles={['admin']}
                exact
                path="/admin"
                component={AdminPage}
              />
              <PrivateRoleRoute
                requiredRoles={['cassa']}
                exact
                path="/cassa"
                component={CashRegisterPage}
              />
              <PrivateRoleRoute
                requiredRoles={['cassa-istantanea']}
                exact
                path="/cassaBar"
                component={InstantCashRegisterPage}
              />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/register" component={RegisterPage} />
              <Route path="/">
                <Redirect to="/" />
              </Route>
            </Switch>
          </Menu>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
