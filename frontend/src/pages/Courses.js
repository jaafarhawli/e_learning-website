import React from 'react';
import Panel from '../components/Panel';
import ShowCourses from '../components/ShowCourses';

const Courses = () => {
  return (
    <div className='flex'>
      <Panel />
      <div className='courses'>
      <h1>Courses</h1>
      <ShowCourses />
     </div>
    </div>
  );
}

export default Courses;
