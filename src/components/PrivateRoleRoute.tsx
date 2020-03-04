import React from 'react';
import { Route, Redirect } from 'react-router-dom';

interface IPrivateRoleRouteProps {
  path: string;
  authed: boolean;
  userRoles: string[];
  requiredRoles: string[];
  exact: boolean;
}

const PrivateRoleRoute: React.FunctionComponent<IPrivateRoleRouteProps> = props => {
  const { authed, path, exact } = props;
  console.log('path', path);
  console.log('exact', exact);
  console.log('authed', authed);
  return (
    <Route
      path={path}
      exact={exact}
      render={() =>
        authed ? <div>ciao{console.log('here')}</div> : <Redirect to="/login" />
      }
    />
  );
  //   return (
  //     <Route path={path} exact={exact}>
  //       {authed ? <div>ciao{console.log('here')}</div> : <Redirect to="/login" />}
  //     </Route>
  //   );
};

export default PrivateRoleRoute;
