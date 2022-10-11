import React from 'react';
import { useState } from 'react';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './Login';


function App() {
  const [token, setToken] = useState();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
