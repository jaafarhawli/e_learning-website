import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

const Login = ({ setToken }) => {

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
 
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
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
    );
}

export default Login;
Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }
