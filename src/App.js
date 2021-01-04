import React, { useState, useEffect } from 'react';
import { useDispatch  } from 'react-redux';

import BlogList from './components/BlogList';
import blogService from './services/blogs';
import Notification from './components/Notification';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';

import { createNotification } from './reducers/notificationReducer';
import { initializeBlogs } from './reducers/blogReducer';


const App = () => {
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    //searching for log in info in the local storage
    const loggedUserDataJSON = window.localStorage.getItem('loggedBlogappUser');
    if(loggedUserDataJSON){
      //userData contains the token, username and name
      const userData = JSON.parse(loggedUserDataJSON);
      setUser(userData);
      //setToken will prepared a bearer token in the blogService local variable token
      blogService.setToken(userData.token);
    }
  }, []);

  const handleLogin = async (userCredentials) => {

    try{
      //userData will have the username, name and token returned from backend
      const userData = await loginService.login(userCredentials);
      //saving the userData in the local storage
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(userData)
      );
      setUser(userData);
      //creating a bearer token in the blogService local variable token
      blogService.setToken(userData.token);
      dispatch(createNotification('success', 'Login Successful', 5000));
    }
    catch(exception){
      dispatch(createNotification('error', 'Invalid username or password', 5000));
    }
  };


  const handleLogout = () => {
    //clearing the local storage of the userData
    window.localStorage.removeItem('loggedBlogappUser');
    //setting the blogService local variable token to null
    blogService.setToken(null);
    setUser(null);
    dispatch(createNotification('success', 'Logout Successful', 5000));
  };


  return (
    <div>
      <Notification />

      {
        user === null ?
          <LoginForm handleLogin={handleLogin} /> :
          <div>
            <h2>{user.name} logged in</h2>
            <button onClick={handleLogout}>Log out</button>
            <BlogForm />
            <BlogList />
          </div>
      }

    </div>
  );
};

export default App;