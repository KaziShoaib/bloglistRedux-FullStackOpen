import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Blog from './components/Blog';
import blogService from './services/blogs';
import Notification from './components/Notification';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';

import { createNotification } from './reducers/notificationReducer';
import { initializeBlogs } from './reducers/blogReducer';


const App = () => {
  const [blogs, setBlogs] = useState([]);
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



  const deleteBlog = async(id) => {
    try {
      await blogService.deleteBlog(id);
      setBlogs(blogs.filter(b => b.id !== id));
      dispatch(createNotification('success', 'the blog has been successfully deleted', 5000));
    } catch(exception) {
      dispatch(createNotification('error', exception.data.error.message, 5000));
    }
  };


  const increaseLikeOf = async (id) => {
    let blog = blogs.find(b => b.id === id);
    let likeObj = { likes : blog.likes + 1 };
    try {
      await blogService.update(id, likeObj);
      //we can't just replace the old blog with the returned blog because
      //the user field is not populated in the returned blog
      setBlogs(blogs.map(blog => {
        return blog.id===id ? { ...blog, likes:blog.likes+1 } : blog;
      }));
    } catch(exception) {
      dispatch(createNotification('error', `Blog ${blog.title} has been deleted`, 5000));
      setBlogs(blogs.filter(b => b.id !== id));
    }
  };

  const sortBlogs = () => {
    const sortedBlog = [...blogs].sort((bloga, blogb) => blogb.likes - bloga.likes);
    setBlogs(sortedBlog);
  };


  const initialBlogs = useSelector(state => state.blogs);
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
            <h2>BLOGS</h2>
            <button onClick={sortBlogs} id='sort-button'>Sort by likes</button>
            {initialBlogs.map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                addLike={() => increaseLikeOf(blog.id)}
                deleteBlog = {deleteBlog}
              />
            )
            }
          </div>
      }

    </div>
  );
};

export default App;