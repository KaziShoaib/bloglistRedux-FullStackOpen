import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { loginUser } from '../reducers/userReducer';
import { useField } from '../hooks';
import '../index.css';

//this component creates it's own states

const LoginForm = () => {

  const { field: username, reset: resetUsername } = useField('text');
  const { field: password, reset: resetPassword } = useField('password');

  const dispatch = useDispatch();
  const history = useHistory();

  //this function should be async and await the handleLogin function
  const sendUserCredentials = async (event) => {
    event.preventDefault();
    const userCredentials = { username: username.value, password: password.value };
    await dispatch(loginUser(userCredentials));
    history.push('/');
    resetUsername();
    resetPassword();
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
            id="username"
            { ...username }
          />
        </div>
        <div>
          Password:
          <input
            name="Password"
            id='password'
            { ...password }
          />
        </div>
        <button id='login-button' type="submit">Log in</button>
      </form>
    </div>
  );
};


export default LoginForm;