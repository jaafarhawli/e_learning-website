import React from 'react';
import {BsPlusLg} from 'react-icons/bs'
import Panel from '../components/Panel';

const Dashboard = () => {
  
  return (
    <div className='flex'>
      <Panel />
      <div className='dashboard'>
      <h1>Admins</h1>
      <div className='dashboard-components flex shadow'>
        <div className='admin-name'>
         <p>Jaafar Hawli</p>
        </div>
        <p>jaafarhawle@gmail.com</p>
      </div>
      <div className='dashboard-components flex shadow'>
        <div className='admin-name'>
         <p>Jaafar Hawli</p>
        </div>
        <p>jaafarhawle@gmail.com</p>
      </div>
      <button className='add-button'>
        <BsPlusLg className='add-icon'/>
      </button>
     </div>
    </div>
  );
}

export default Dashboard;
