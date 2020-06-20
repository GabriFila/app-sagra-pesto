import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import PrivateRoleRoute from './components/PrivateRoleRoute';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import AdminPage from './components/admin/AdminPage';
import AuthProvider from './context/AuthContext';
import Menu from './components/TopBar';
import CashRegisterPage from './components/cashRegister/CashRegisterPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Menu>
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
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
          </Switch>
        </Menu>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
