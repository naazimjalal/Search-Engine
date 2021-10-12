import './App.css';
import React from 'react';
import Home from './Pages/Home'
import firebase from 'firebase'
import firebaseConfig from './database/db';
import Results from './Pages/Results'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics()
  } 
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/results">
            <Results />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch >
     </Router>
    </div>
  );
}

export default App;
