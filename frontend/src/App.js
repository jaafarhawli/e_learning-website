import React from 'react';
import { useState } from 'react';
import {Route, Routes} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './Login';
import Instructors from './pages/Instructors';
import Students from './pages/Students';
import Courses from './pages/Courses';
import Announcements from './pages/Announcements';
import Instructor from './pages/Instructor';
import Student from './pages/Student';
import Course from './pages/Course';

function App() {

  const getToken = () => {
    const token = localStorage.getItem('token');
    if(token) {
      return token;
    }
    
  };
  const [token, setToken] = useState(getToken());

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="App">
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/instructors' element={<Instructors />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/students' element={<Students />} />
          <Route path='/announcements' element={<Announcements />} />
          <Route path='/instructors/instructor' element={<Instructor />} />
          <Route path='/students/student' element={<Student />} />
          <Route path='/courses/course' element={<Course />} />
        </Routes>
    </div>
  );
}

export default App;
