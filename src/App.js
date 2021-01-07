import React, { useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from 'react-router-dom';

import BlogList from './components/BlogList';
import Blog from './components/Blog';
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
      //the task of setting token has been transferred to the reducer
    }
  }, [dispatch]);

  const userData = useSelector(state => state.userData);

  return (

    <div>
      <Notification />
      <Router>
        {userData ?
          <div>
            <UserInfo />
            <Link to='/'>
              <button>
                All Blogs
              </button>
            </Link>
          </div>
          : <div></div>
        }

        <Switch>
          <Route exact path = '/blogs/:id'>
            {userData ? <Blog /> : <Redirect to='/login' />}
          </Route>
          <Route exact path ='/login' >
            { userData ? <Redirect to='/' /> : <LoginForm />}
          </Route>
          <Route exact path = '/'>
            { userData ?
              <div>
                <BlogForm />
                <BlogList />
              </div>
              : <Redirect to='/login' /> }
          </Route>
        </Switch>
      </Router>
    </div>

  );
};

export default App;