import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { loginUser } from '../reducers/userReducer';
import { useField } from '../hooks';
//import '../index.css';
import { Form, Button } from 'react-bootstrap';

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
      <h2 className='text-primary'>Log in to application</h2>
      <Form onSubmit={sendUserCredentials}>
        {/* the ids are given for test purpose */}
        <Form.Group>
          <Form.Label>
            Username
          </Form.Label>
          <Form.Control
            name="Username"
            id="username"
            { ...username }
          />
          <Form.Label>
            Password
          </Form.Label>
          <Form.Control
            name="Password"
            id='password'
            { ...password }
          />
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
      {/* <form onSubmit={sendUserCredentials}>
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
      </form> */}
    </div>
  );
};


export default LoginForm;