import React, { useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';

import BlogList from './components/BlogList';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import UserInfo from './components/UserInfo';


import { initializeBlogs } from './reducers/blogReducer';
import { initializeUser  } from './reducers/userReducer';


const App = () => {

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
      dispatch(initializeUser(userData));
      //setToken will prepared a bearer token in the blogService local variable token
    }
  }, [dispatch]);

  const userData = useSelector(state => state.userData);

  return (
    <div>
      <Notification />

      {
        userData === null ?
          <LoginForm /> :
          <div>
            <UserInfo />
            <BlogForm />
            <BlogList />
          </div>
      }

    </div>
  );
};

export default App;