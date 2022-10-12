import React from 'react';
import Panel from '../components/Panel';
import ShowInstructors from '../components/ShowInstructors';

const Instructors = () => {
  return (
    <div className='flex'>
      <Panel />
      <div className='instructors'>
      <h1>Instructors</h1>
      <ShowInstructors />
     </div>
    </div>
  );
}

export default Instructors;
