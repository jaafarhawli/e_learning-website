import React from 'react';
import Panel from '../components/Panel';
import Admins from '../components/Admins';
import AddAdminModal from '../components/AddAdminModal';

const Dashboard = () => {
  
  return (
    <div className='flex'>
      <Panel />
      <div className='dashboard'>
      <h1>Admins</h1>
      <Admins />
      <AddAdminModal />
     </div>
    </div>
  );
}

export default Dashboard;
