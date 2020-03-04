import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

interface IPrivateRoleRouteProps {
  path: string;
  exact: boolean;
  requiredRoles: string[];
  component: React.FunctionComponent;
}

const PrivateRoleRoute: React.FunctionComponent<IPrivateRoleRouteProps> = ({
  path,
  exact,
  requiredRoles,
  component: Component
}) => {
  const { isLoggedIn, userRoles } = useContext(AuthContext);

  console.log('authed', isLoggedIn);
  return (
    <Route
      path={path}
      exact={exact}
      render={() => {
        // if (
        //   isLoggedIn &&
        //   userRoles.length > 0 &&
        //   userRoles.some(role => requiredRoles.includes(role))
        // ) {
        //   // return <Redirect to={`/${userRoles[0]}`} />;
        //   return <Component />;
        // } else
        if (isLoggedIn) {
          console.log('private true');
          return <Component />;
        } else {
          console.log('private false');
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default PrivateRoleRoute;
