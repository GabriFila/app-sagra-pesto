import React, { useEffect, useState } from 'react';
// import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import TopBar from './components/TopBar';
import PrivateRoleRoute from './components/PrivateRoleRoute';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import HomePage from './Pages/HomePage';
import AdminPage from './Pages/AdminPage';
import AuthProvider from './AuthContext';

function App() {
  return (
    <AuthProvider>
      <TopBar />
      <BrowserRouter>
        <Switch>
          <PrivateRoleRoute
            requiredRoles={[]}
            exact
            path="/"
            component={HomePage}
          />
          <PrivateRoleRoute
            requiredRoles={['admin']}
            exact
            path="/admin"
            component={AdminPage}
          />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
