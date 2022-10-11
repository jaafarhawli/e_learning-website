import React from 'react';
import Panel from "./components/Panel";
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App flex">
      <Router>
        <Panel />
        <Routes>
          <Route path='/' />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
