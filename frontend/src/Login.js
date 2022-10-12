import React from 'react';
import { useState, useEffect } from 'react';
import axios from './api/axios';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    
    const navigate = useNavigate();

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userType, setUserType] = useState();

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
                setIsAuthenticated(true);
                if(data.data.user.type === 'admin') {
                    setUserType('admin');
                }
                else if(data.data.user.type === 'instructor') {
                    setUserType('instructor');
                }
                else {
                    setUserType('student');
                }
            }
            // if(localStorage.type === 'admin') {
            //     navigate("/dashboard");
            // }
            // window.location.reload(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(isAuthenticated && userType === 'admin') {
            navigate("/dashboard");
        }
        if(isAuthenticated && userType === 'instructor') {
            navigate("/instructordashboard");
        }
        if(isAuthenticated && userType === 'student') {
            navigate("/student-page");
        }

    }, [isAuthenticated, userType] )
 
    return(
        <div className="login-wrapper">
          <div className='login-container flex column'>
            <h1>Log In</h1>
            <form className='login-form flex column'>
              <label>
                <p>Username</p>
                <input type="text" onChange={e => setUserName(e.target.value)} />
              </label>
              <label>
                <p>Password</p>
                <input type="password" onChange={e => setPassword(e.target.value)} />
              </label>
              <div>
                <button type="button" className='button' onClick={handleSubmit}>Submit</button>
              </div>
            </form>
          </div>
        </div>
    );
}

export default Login;
