import React, { useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';


import BlogList from './components/BlogList';
import Blog from './components/Blog';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import UserList from './components/UserList';
import User from './components/User';


import { initializeBlogs } from './reducers/blogReducer';
import { initializeUser  } from './reducers/userReducer';
import { logoutUser } from './reducers/userReducer';



const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);


  //App starts loading before useEffect() is completed
  //this exact same tasks have been repeated on top of userReducer
  //technically this useEffect() is not necessary
  useEffect(() => {
    //searching for log in info in the local storage
    const loggedUserDataJSON = window.localStorage.getItem('loggedBlogappUser');
    if(loggedUserDataJSON){
      //userData contains the token, username and name
      const userDataFromLocalStorage = JSON.parse(loggedUserDataJSON);
      //the dispathed action will also set the token in the blogService variable
      dispatch(initializeUser(userDataFromLocalStorage));
    }
  }, [dispatch]);


  const userData = useSelector(state => state.userData);
  console.log('userData from app component',userData);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (

    <div className='container'>
      <Notification />
      <Router>
        {userData ?
          <Navbar collapseOnSelect expand='lg' variant='dark' bg='primary'>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
              <Nav className='mr-auto'>
                <Nav.Link href='#' as='span'>
                  <Button>
                    <Link to='/' className='text-white'>All Blogs</Link>
                  </Button>
                </Nav.Link>
                <Nav.Link href='#' as='span'>
                  <Button>
                    <Link to='/users' className='text-white'>All Users</Link>
                  </Button>
                </Nav.Link>
                <Nav.Link href='#' as='span'>
                  <Button>
                    <em>{userData.name} logged in</em>
                  </Button>
                </Nav.Link>
                <Nav.Link href='#' as='span'>
                  <Button onClick={handleLogout}>
                    Log Out
                  </Button>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>  :
          <div></div>
        }

        <Switch>
          <Route exact path = '/blogs/:id'>
            {userData ? <Blog /> : <Redirect to='/login' />}
          </Route>
          <Route exact path='/users/:id'>
            {userData ? <User /> : <Redirect to='/login' />}
          </Route>
          <Route exact path='/users'>
            {userData ? <UserList/> : <Redirect to='/login' />}
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