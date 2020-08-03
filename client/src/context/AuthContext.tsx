import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../fbConfig';
import { IRole } from '../../../types';
import claimsToRoles from '../helpers/claimsToRoles';

interface IAuthContext {
  phase: string;
  userRoles: IRole[];
  name: string | null;
}
export const AuthContext = createContext<IAuthContext>({
  phase: 'pending',
  userRoles: [],
  name: ''
});

const AuthProvider: React.FunctionComponent = ({ children }) => {
  const [authState, setAuthState] = useState<IAuthContext>({
    phase: 'pending',
    userRoles: [],
    name: ''
  });
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        user.getIdTokenResult().then(idTokenResult => {
          setAuthState({
            phase: 'in',
            userRoles: claimsToRoles(idTokenResult.claims),
            name: user.displayName
          });
        });
        console.info(`User is logged in`);
      } else {
        setAuthState({ phase: 'out', userRoles: [], name: '' });
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
