import React from 'react';
// import './App.css';
import TopBar from './components/TopBar';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { db } from './fbConfig';

function App() {
  db.collection('temp')
    .get()
    .then(snaps => snaps.forEach(snap => console.log(snap.data())))
    .catch(err => console.log(err.message));
  return (
    <>
      <TopBar />
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            Home
          </Route>
          <Route path="/login">Login</Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
