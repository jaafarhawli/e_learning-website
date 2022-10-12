import React from 'react';
import {BsPlusLg} from 'react-icons/bs'
import Panel from '../components/Panel';
import Admins from '../components/Admins';

const Dashboard = () => {
  
  return (
    <div className='flex'>
      <Panel />
      <div className='dashboard'>
      <h1>Admins</h1>
      <Admins />
      <button className='add-button'>
        <BsPlusLg className='add-icon'/>
      </button>
     </div>
    </div>
  );
}

export default Dashboard;
