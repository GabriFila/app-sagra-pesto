import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../fbConfig';
import { IRoleRouteInfo } from '../clientTypes';
import claimsToRoles from '../helpers/claimsToRoles';

interface IAuthContext {
  phase: string;
  userRoles: IRoleRouteInfo[];
  userName: string | null;
  userId: string;
}

const initialContextValue: IAuthContext = {
  phase: 'pending',
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
            phase: 'in',
            userRoles: claimsToRoles(idTokenResult.claims),
            userName: user.displayName,
            userId: user.uid
          });
        });
        console.info(`User is logged in`);
      } else {
        setAuthState({ phase: 'out', userRoles: [], userName: '', userId: '' });
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
