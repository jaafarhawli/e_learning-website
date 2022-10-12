import React from 'react';
import Panel from '../components/Panel';
import ShowInstructors from '../components/ShowInstructors';
import AddInstructorModal from '../components/AddInstructorModel';

const Instructors = () => {
  return (
    <div className='flex'>
      <Panel />
      <div className='instructors'>
      <h1>Instructors</h1>
      <ShowInstructors />
      <AddInstructorModal />
     </div>
    </div>
  );
}

export default Instructors;
