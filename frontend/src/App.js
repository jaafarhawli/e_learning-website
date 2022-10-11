import React from 'react';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import Admin from './AdminPage';
import Login from './Login';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/admin'>
            <Admin />
          </Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
