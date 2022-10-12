import React from 'react';
import Panel from '../components/Panel';
import ShowStudents from '../components/ShowStudents';
import AddStudentModal from '../components/AddStudentModal';

const Students = () => {
  return (
    <div className='flex'>
      <Panel />
      <div className='students'>
      <h1>Students</h1>
      <ShowStudents />
      <AddStudentModal />
     </div>
    </div>
  );
}

export default Students;
