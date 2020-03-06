import React from 'react';
// import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import PrivateRoleRoute from './components/PrivateRoleRoute';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import HomePage from './Pages/HomePage';
import AdminPage from './components/Admin/AdminPage';
import AuthProvider from './context/AuthContext';
import Menu from './components/TopBar';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Menu>
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
        </Menu>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
