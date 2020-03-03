import React from 'react';
// import './App.css';
import TopBar from './components/TopBar';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { db } from './fbConfig';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';

function App() {
  return (
    <>
      <TopBar />
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            Home
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
