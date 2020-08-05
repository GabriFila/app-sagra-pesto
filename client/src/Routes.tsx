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
import KitchenPage from './components/kitchen/KitchenPage';

import { IRoleRouteInfo } from '../../types';

export const ROUTE_ROLES: IRoleRouteInfo[] = [
  {
    title: 'Admin',
    requiredRole: 'admin',
    path: '/admin',
    component: AdminPage
  },
  {
    title: '',
    requiredRole: 'cassa',
    path: '/cassa',
    component: CashRegisterPage
  },
  {
    title: 'Cassa bar',
    requiredRole: 'cassa-istantanea',
    path: '/cassaBar',
    component: InstantCashRegisterPage
  },
  {
    title: 'Cucina primi',
    requiredRole: 'cucina-primi',
    path: '/cucina/primi',
    component: KitchenPage
  },
  {
    title: 'Cucina secondi',
    requiredRole: 'cucina-secondi',
    path: '/cucina/secondi',
    component: KitchenPage
  },
  {
    title: 'Cucina bar',
    requiredRole: 'cucina-bar',
    path: '/cucina/bar',
    component: KitchenPage
  },
  {
    title: 'Camerier*',
    requiredRole: 'cameriere',
    path: '/cameriere',
    component: WaiterPage
  }
  // { requiredRole: 'smazzo', route: '/smazzo', component:SmazzoPage }
];

export default function Routes() {
  return (
    <Switch>
      <PrivateRoleRoute
        requiredRoles={[]}
        exact
        path="/"
        component={HomePage}
      />
      {ROUTE_ROLES.map(({ requiredRole, path, component }) => (
        <PrivateRoleRoute
          key={path}
          requiredRoles={[requiredRole]}
          path={path}
          component={component}
        />
      ))}

      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route path="/">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}
