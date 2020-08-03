import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import PrivateRoleRoute from './components/PrivateRoleRoute';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import AdminPage from './components/admin/AdminPage';
import CashRegisterPage from './components/cashRegister/CashRegisterPage';
import InstantCashRegisterPage from './components/instantCashRegister/InstantCashRegisterPage';
import WaiterPage from './components/waiter/WaiterPage';

export default function Routes() {
  return (
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
      <PrivateRoleRoute
        requiredRoles={['cameriere']}
        exact
        path="/cameriere"
        component={WaiterPage}
      />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route path="/">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}
