import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from './api/axios';

const Login = ({ setToken }) => {

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const userLogin = async () => {
        const form = {
            email: username,
            password: password
        };
        try {
            const data = await axios.post('/api/v1/login', form);
            console.log(data);
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
              <button type="button" onClick={userLogin}>Submit</button>
            </div>
          </form>
        </div>
    );
}

export default Login;
Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }
