import React, { useState, useEffect, useCallback } from "react";
import PastesList from "./components/PastesList";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Statistics from './components/Statistics'
function App() {
 
  return (
    <div className="App">
      <Router>
      <Switch >
        <Route exact path='/' component={PastesList} />
        <Route exact path='/statistics' component={Statistics} />
      </Switch>
      </Router>
    </div>
  );
}

export default App;
