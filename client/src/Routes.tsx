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
import { IRoleRouteInfo } from './clientTypes';
import HubPage from './components/hub/HubPage';

export enum RoleName {
  Admin = 'admin',
  CashRegister = 'cassa',
  InstantCashRegister = 'cassa-istantanea',
  KitchenFirst = 'cucina-primi',
  KitchenSecond = 'cucina-secondi',
  KitchenBar = 'cucina-bar',
  Waiter = 'sala',
  Hub = 'smazzo'
}

export const ROUTE_ROLES: IRoleRouteInfo[] = [
  {
    title: 'Admin',
    requiredRole: RoleName.Admin,
    path: '/admin',
    component: AdminPage
  },
  {
    title: 'Cassa',
    requiredRole: RoleName.CashRegister,
    path: '/cassa',
    component: CashRegisterPage
  },
  {
    title: 'Cassa bar',
    requiredRole: RoleName.InstantCashRegister,
    path: '/cassaBar',
    component: InstantCashRegisterPage
  },
  {
    title: 'Cucina primi',
    requiredRole: RoleName.KitchenFirst,
    path: '/cucina/primi',
    component: KitchenPage
  },
  {
    title: 'Cucina secondi',
    requiredRole: RoleName.KitchenSecond,
    path: '/cucina/secondi',
    component: KitchenPage
  },
  {
    title: 'Cucina bar',
    requiredRole: RoleName.KitchenBar,
    path: '/cucina/bar',
    component: KitchenPage
  },
  {
    title: 'Sala',
    requiredRole: RoleName.Waiter,
    path: '/cameriere',
    component: WaiterPage
  },
  {
    requiredRole: RoleName.Hub,
    title: 'Smazzo',
    component: HubPage,
    path: '/smazzo'
  }
];

const Routes: React.FunctionComponent = () => {
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
};

export default Routes;
