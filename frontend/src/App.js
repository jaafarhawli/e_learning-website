import React from 'react';
import Panel from "./components/Panel";
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Instructors from './pages/Instructors';
import Students from './pages/Students';


function App() {
  return (
    <div className="App flex">
      <Router>
        <Panel />
        <Routes>
          <Route path='/dashboard' exact element={<Dashboard />} />
          <Route path='/instructors' element={<Instructors />} />
          <Route path='/students' element={<Students />} />
          <Route path='/courses' elementt={<Courses />} />
          <Route path='/announcements' element={<Announcements />} />
          <Route path='/logout' element={<Logout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
