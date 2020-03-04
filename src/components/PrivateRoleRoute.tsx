import React from 'react';
import { Route, Redirect } from 'react-router-dom';

interface IPrivateRoleRouteProps {
  path: string;
  authed: boolean;
  component: React.FunctionComponent;
  userRoles: string[];
  requiredRoles: string[];
  exact: boolean;
}

export default function PrivateRoleRoute({
  authed,
  path,
  exact,
  component
}: IPrivateRoleRouteProps) {
  console.log(authed);
  if (authed)
    return <Route path={path} exact={exact} component={component}></Route>;
  else return <Redirect to="/login" />;
}
