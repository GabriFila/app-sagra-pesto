import React, { createContext, useState, useEffect } from 'react';
import { auth } from './fbConfig';
import claimsToRoles from './helpers/claimsToRoles';

interface IAuthContext {
  phase: string;
  userRoles: string[];
}
export const AuthContext = createContext<IAuthContext>({
  phase: 'pending',
  userRoles: []
});

const AuthProvider: React.FunctionComponent = ({ children }) => {
  const [authState, setAuthState] = useState<IAuthContext>({
    phase: 'pending',
    userRoles: []
  });
  console.log('in context');
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        user.getIdTokenResult().then(idTokenResult => {
          setAuthState({
            phase: 'in',
            userRoles: claimsToRoles(idTokenResult.claims)
          });
        });
        console.log(`User is logged in`);
      } else {
        setAuthState({ phase: 'out', userRoles: [] });
        console.log('User is logged out');
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
