import React from 'react';
import Panel from '../components/Panel';
import ShowStudents from '../components/ShowStudents';

const Students = () => {
  return (
    <div className='flex'>
      <Panel />
      <div className='students'>
      <h1>Students</h1>
      <ShowStudents />
     </div>
    </div>
  );
}

export default Students;
