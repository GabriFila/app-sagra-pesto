import React from 'react';
import { Route, Redirect } from 'react-router-dom';

interface IPrivateRoleRouteProps {
  path: string;
  authed: boolean;
  exact: boolean;
  component: React.FunctionComponent;
}

const PrivateRoleRoute: React.FunctionComponent<IPrivateRoleRouteProps> = ({
  authed,
  path,
  exact,
  component: Component
}) => {
  console.log('authed', authed);
  return (
    <Route
      path={path}
      exact={exact}
      render={() => {
        if (authed) {
          console.log('true');
          return <Component />;
        } else {
          console.log('false');
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default PrivateRoleRoute;
