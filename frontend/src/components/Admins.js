import React from 'react';
import axios from './api/axios';

const Admins = () => {
    
    const showAdmins = async () => {
        const form = {
            email: username,
            password: password
        };
        try {
            const data = await axios.post('/api/v1/login', form);
            const token = data.data.authorisation.token;
            if(token) {
                localStorage.setItem('token', token);
                localStorage.setItem('id', data.data.user._id);
                localStorage.setItem('name', data.data.user.name);
                localStorage.setItem('email', data.data.user.email);
                localStorage.setItem('type', data.data.user.type);
                
            }
            if(localStorage.type === 'admin') {
                navigate("/dashboard");
            }
            window.location.reload(false);
        } catch (error) {
            console.log(error);
        }
    }
  
    return (
    <div className='dashboard'>
      {PanelComponent.map((item, index) => {

      })}
    </div>
  );
}

export default Admins;
