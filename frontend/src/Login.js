import React from 'react';
import { useState } from 'react';
import axios from './api/axios';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    
    const navigate = useNavigate();

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async () => {
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
                navigate("/dashboard");
            }
        } catch (error) {
            console.log(error);
        }
    }
 
    return(
        <div className="login-wrapper">
          <h1>Please Log In</h1>
          <form>
            <label>
              <p>Username</p>
              <input type="text" onChange={e => setUserName(e.target.value)} />
            </label>
            <label>
              <p>Password</p>
              <input type="password" onChange={e => setPassword(e.target.value)} />
            </label>
            <div>
              <button type="button" onClick={handleSubmit}>Submit</button>
            </div>
          </form>
        </div>
    );
}

export default Login;
