import React from 'react';
import { useState } from 'react';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import Admin from './AdminPage';
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
          <Route path='/login' exact element={<Login />} />
          <Route path='/admin' element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
