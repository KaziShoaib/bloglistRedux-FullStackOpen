import React, { useState } from 'react';
import '../index.css';

//this component creates it's own states
//it gets one function in props
//once the log in button is pressed the login form submission function
//sends the new user credentials to the props function

const LoginForm = ({ handleLogin }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //this function should be async and await the handleLogin function
  const sendUserCredentials = (event) => {
    event.preventDefault();
    const userCredentials = { username, password };
    handleLogin(userCredentials);
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={sendUserCredentials}>
        <div>
          Username:
          <input
            name="Username"
            value={username}
            type="text"
            onChange = {event => setUsername(event.target.value)}
          />
        </div>
        <div>
          Password:
          <input
            name="Password"
            value={password}
            type="password"
            onChange = {event => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};


export default LoginForm;