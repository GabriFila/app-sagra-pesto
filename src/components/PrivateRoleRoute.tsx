import React, { useContext } from 'react';
import {
  Route,
  Redirect,
  RouteComponentProps,
  RouteProps
} from 'react-router-dom';
import { AuthContext } from '../AuthContext';

interface IPrivateRouteProps extends RouteProps {
  component: React.FunctionComponent<RouteComponentProps>;
  requiredRoles: string[];
}

const PrivateRoute: React.FunctionComponent<IPrivateRouteProps> = ({
  component: RouteComponent,
  requiredRoles,
  ...rest
}) => {
  const { phase, userRoles } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={routeProps => {
        switch (phase) {
          case 'in':
            if (userRoles.some(role => requiredRoles.includes(role)))
              return <RouteComponent {...routeProps} />;
            else return <Redirect to={'/'} />;
          case 'out':
            return <Redirect to={'/login'} />;
          default:
            return <div></div>;
        }
      }}
    />
  );
};

export default PrivateRoute;
