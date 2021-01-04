import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { loginUser } from '../reducers/userReducer';
import '../index.css';

//this component creates it's own states
//it gets one function in props
//once the log in button is pressed the login form submission function
//sends the new user credentials to the props function

const LoginForm = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  //this function should be async and await the handleLogin function
  const sendUserCredentials = async (event) => {
    event.preventDefault();
    const userCredentials = { username, password };
    await dispatch(loginUser(userCredentials));
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={sendUserCredentials}>
        {/* the ids are given for test purpose */}
        <div>
          Username:
          <input
            name="Username"
            value={username}
            type="text"
            id="username"
            onChange = {event => setUsername(event.target.value)}
          />
        </div>
        <div>
          Password:
          <input
            name="Password"
            value={password}
            type="password"
            id='password'
            onChange = {event => setPassword(event.target.value)}
          />
        </div>
        <button id='login-button' type="submit">Log in</button>
      </form>
    </div>
  );
};


export default LoginForm;