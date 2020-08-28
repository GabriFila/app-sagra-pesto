import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../fbConfig';
import { IRoleRouteInfo } from '../clientTypes';
import { ROUTE_ROLES } from '../Routes';

interface IAuthContext {
  authPhase: 'unknown' | 'in' | 'out';
  userRoles: IRoleRouteInfo[];
  userName: string | null;
  userId: string;
}

const initialContextValue: IAuthContext = {
  authPhase: 'unknown',
  userRoles: [] as IRoleRouteInfo[],
  userName: '',
  userId: ''
};

export const AuthContext = createContext<IAuthContext>(initialContextValue);

const AuthProvider: React.FunctionComponent = ({ children }) => {
  const [authState, setAuthState] = useState<IAuthContext>(initialContextValue);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        user.getIdTokenResult().then(idTokenResult => {
          setAuthState({
            authPhase: 'in',
            userRoles: ROUTE_ROLES.filter(role =>
              idTokenResult.claims.roles.includes(role.requiredRole)
            ),
            userName: user.displayName,
            userId: user.uid
          });
        });
        console.info(`User is logged in`);
      } else {
        setAuthState({
          authPhase: 'out',
          userRoles: [],
          userName: '',
          userId: ''
        });
        console.info('User is logged out');
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
