import React from 'react';
import {useState, useEffect} from 'react';
import axios from '../api/axios'
import Panel from '../components/Panel';
import DashboardLoadingOutput from './DashboardLoadingOutput';
import AddAdminModal from '../components/AddAdminModal';



const DashboardLoading = () => {

  const [items, setItems] = useState([]) 
  const [isLoading, setLoading] = useState(true)

  const showAdmins = async () => {
    try {
        const data = await axios.get('/api/v1/view_admins', {
            headers: {
                Authorization: `bearer ${localStorage.token}`
            }
        });
        setItems(data.data.data)
        setLoading(false)
    } catch (error) {
        console.log(error);
    }
};

useEffect(() => {
    showAdmins() 
}, [])

  return   (<div className="flex">
                <Panel />
                <div className='dashboard'>
                    <h1>Admins</h1>
                    <DashboardLoadingOutput isLoading ={isLoading} items = {items}/>
                    <AddAdminModal isLoading ={isLoading} />
                </div>
            </div>
            )
}

export default DashboardLoading;