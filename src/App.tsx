import React, { useEffect, useState } from 'react';
// import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import TopBar from './components/TopBar';
import PrivateRoleRoute from './components/PrivateRoleRoute';
import { auth } from './fbConfig';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import HomePage from './Pages/HomePage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
        console.log('user is logged in');
      } else {
        setIsLoggedIn(false);
        console.log('user is logged out');
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <TopBar authed={isLoggedIn} />
      <BrowserRouter>
        <Switch>
          <PrivateRoleRoute
            exact
            path="/"
            authed={isLoggedIn}
            component={HomePage}
          />
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
